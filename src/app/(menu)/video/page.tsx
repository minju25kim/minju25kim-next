import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function VideoPage() {
  const supabase = await createClient();

  // List all files in the videos bucket
  const { data: files, error } = await supabase.storage.from("videos").list();

  if (error) {
    console.error("Error fetching videos:", error);
  }

  // Get public URLs for all videos and categorize them
  const allVideos = (files || []).map((file) => {
    const {
      data: { publicUrl },
    } = supabase.storage.from("videos").getPublicUrl(file.name);

    return {
      id: file.id,
      name: file.name,
      url: publicUrl,
      created_at: file.created_at,
      isShort:
        file.name.toLowerCase().includes("short") ||
        file.name.toLowerCase().includes("shorts"),
    };
  });

  // Separate videos into regular videos and shorts
  const videos = allVideos.filter((video) => !video.isShort);
  const shorts = allVideos.filter((video) => video.isShort);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Content
          </h1>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="videos"
              className="px-3 py-1.5 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="shorts"
              className="px-3 py-1.5 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Shorts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {videos.map((video) => (
                <div key={video.id} className="overflow-hidden">
                  <video controls className="w-full rounded-lg">
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-3">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {video.name.replace(/\.[^/.]+$/, "")}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(video.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {!videos.length && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                No videos found
              </div>
            )}
          </TabsContent>

          <TabsContent value="shorts" className="mt-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {shorts.map((video) => (
                <div key={video.id} className="overflow-hidden">
                  <div className="aspect-[9/16]">
                    <video
                      controls
                      className="w-full h-full object-cover rounded-lg"
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-3">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {video.name.replace(/\.[^/.]+$/, "")}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(video.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {!shorts.length && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                No shorts found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
