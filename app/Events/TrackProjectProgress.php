<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrackProjectProgress implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $projectProgress;
    /**
     * Create a new event instance.
     */
    public function __construct($projectProgress)
    {
        $this->projectProgress = $projectProgress;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new channel('projectProgress'),
        ];
    }
}