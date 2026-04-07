<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PodcastsController extends Controller
{
    public function podcasts()
    {
        return Inertia::render('backend/Operator/Podcasts/ManagePodcasts', [
            'stats' => [
                'total_podcasts' => 4,
                'live_sessions' => 2,
                'recorded' => 3,
                'total_revenue' => 25908.35,
            ],
            'podcasts' => [
                [
                    'id' => 1,
                    'title' => 'Finding Inner Peace Through Meditation',
                    'description' => 'Explore techniques for achieving deep relaxation and inner peace.',
                    'type' => 'recorded',
                    'status' => 'published',
                    'duration' => 35,
                    'plays' => 1240,
                    'price' => 9.99,
                    'published_at' => '2024-11-15',
                    'thumbnail' => 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400',
                ],
                [
                    'id' => 2,
                    'title' => 'Live Q&A: Wellness for Busy Professionals',
                    'description' => 'Join me for a live session where we discuss practical wellness strategies.',
                    'type' => 'live',
                    'status' => 'published',
                    'price' => 19.99,
                    'scheduled_at' => '2025-02-15T18:00:00',
                    'duration' => 60,
                    'booked' => 23,
                    'capacity' => 50,
                    'thumbnail' => 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400',
                ],
            ],
        ]);
    }

    public function createPodcast(): \Inertia\Response
    {
        return Inertia::render('backend/Operator/Podcasts/CreatePodcast');
    }

    public function prerecorded(): \Inertia\Response
    {
        return Inertia::render('backend/Operator/Podcasts/PreRecorded');
    }

    public function liveSession(): \Inertia\Response
    {
        return Inertia::render('backend/Operator/Podcasts/LiveSession');
    }
}
