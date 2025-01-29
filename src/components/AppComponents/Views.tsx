// 'use client'

// import { useEffect, useState } from "react";

// interface ViewsProps {
//     contentId: string;
//     incrementOnMount?: boolean;
// }

// export default function Views({ contentId, incrementOnMount = false }: ViewsProps) {
//     const [views, setViews] = useState<number | null>(null);

//     const fetchTotalViews = async () => {
//         try {
//             const response = await fetch(`/api/view?contentId=${contentId}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setViews(data);
//             } else {
//                 console.error('Failed to fetch views:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error fetching views:', error);
//         }
//     };

//     const incrementViews = async () => {
//         try {
//             await fetch(`/api/view?contentId=${contentId}`, {
//                 method: 'POST',
//             });
//         } catch (error) {
//             console.error('Error incrementing views:', error);
//         }
//     };

//     useEffect(() => {
//         if (incrementOnMount) {
//             incrementViews();
//         }
//         fetchTotalViews();

//     }, [contentId, incrementOnMount]);

//     return <span>{views}</span>
// }