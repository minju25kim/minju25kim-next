export type Post = {
  dir: string;
  _id: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  keywords: string[];
  author: string;
};

export type Json = {
  slug: string;
  fileContents: string;
};

export interface ResumeData {
  meta: {
    title: string;
    lang: string;
    version: string;
  };
  resume: {
    infos: {
      name: string;
      headline: string;
      phone?: string;
      email: string;
      location: string;
      url: {
        label: string;
        href: string;
      };
      picture?: {
        url: string;
        size: number;
        aspectRatio: number;
        borderRadius: number;
        effects: {
          hidden: boolean;
          border: boolean;
          grayscale: boolean;
        };
      };
      items: Array<{
        network: string;
        username: string;
        icon: string;
        url: {
          label: string;
          href: string;
        };
      }>;
    };
    summary: {
      name: string;
      content: string;
    };
    education: {
      name: string;
      items: Array<{
        institution: string;
        studyType: string;
        area: string;
        score: string;
        date: string;
        summary: string;
        url: {
          label: string;
          href: string;
        };
      }>;
    };
    experience: {
      name: string;
      columns: number;
      separateLinks: boolean;
      visible: boolean;
      id: string;
      items: Array<{
        visible: boolean;
        company: string;
        position: string;
        location: string;
        date: string;
        summary: string[];
        url: {
          label: string;
          href: string;
        };
      }>;
    };
    projects: {
      name: string;
      columns: number;
      separateLinks: boolean;
      visible: boolean;
      id: string;
      items: Array<{
        date: string;
        summary: string[];
        url: {
          label: string;
          href: string;
        };
      }>;
    };
    skills: {
      name: string;
      columns: number;
      separateLinks: boolean;
      visible: boolean;
      id: string;
      items: Array<{
        name: string;
        description: string;
        level: number;
        keywords: string[];
      }>;
    };
  };
}
