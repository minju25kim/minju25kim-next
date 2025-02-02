'use client'

import { useEffect, useState, useCallback } from "react";

interface ViewsProps {
    contentId: string;
    incrementOnMount?: boolean;
}

export default function Views({ contentId, incrementOnMount = false }: ViewsProps) {
    const [views, setViews] = useState<number | null>(null);

    const fetchTotalViews = useCallback(async () => {
        try {
            const response = await fetch(`/api/view?contentId=${contentId}`);
            if (response.ok) {
                const data = await response.json();
                setViews(data);
            } else {
                console.error('Failed to fetch views:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching views:', error);
        }
    }, [contentId]);

    const incrementViews = useCallback(async () => {
        try {
            await fetch(`/api/view?contentId=${contentId}`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    }, [contentId]);

    useEffect(() => {
        if (incrementOnMount) {
            incrementViews();
        }
        fetchTotalViews();

    }, [contentId, incrementOnMount, fetchTotalViews, incrementViews]);

    return <span>{views}</span>
}