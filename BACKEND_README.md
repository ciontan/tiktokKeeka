# Video Watching Backend System

This backend system implements a video watching platform with creator reward distribution based on watch time.

## Architecture

The system consists of several key classes:

### Core Classes

1. **Video** (`src/models/Video.ts`)

   - Manages individual video properties
   - Tracks video ID, watch time, and creator ID
   - Provides methods to increment/reset watch time

2. **Creator** (`src/models/Creator.ts`)

   - Tracks creator statistics
   - Stores duration watched, percentage watched, and coin amount
   - Provides methods to update creator metrics

3. **VideoFeed** (`src/models/VideoFeed.ts`)

   - Main controller for the video watching system
   - Manages 30 videos with random creator assignments (1-5)
   - Handles video transitions and watch time tracking
   - Implements the core business logic

4. **RewardCalculator** (`src/models/RewardCalculator.ts`)

   - Calculates percentage-based reward distribution
   - Manages the coin distribution among creators
   - Provides validation and summary generation

5. **VideoWatchingApp** (`src/VideoWatchingApp.ts`)
   - Main application class that orchestrates all components
   - Provides high-level interface for the system
   - Handles application lifecycle (startup, video transitions, exit)

## Key Features

### Initialization

- **HashMap of Creators**: Maps creator IDs to Creator objects with stats (duration_watched, percentage_watched, amount)
- **Video Array**: 30 videos, each assigned a random creator ID (1-5)
- **Active Tracking**: Tracks current video and creator being watched
- **Duration Tracking**: Real-time tracking of watch duration
- **Coin Counter**: Default of 5 coins for distribution

### Core Functionality

#### Startup Function

- Initializes active_video to video_1
- Starts timing the watch duration
- Sets up the watching loop

#### Video Watching Loop

- Continuously tracks watch time while user is viewing
- Updates duration in real-time
- Maintains watching state

#### Next Video Function

- Updates creator's total watch time in the HashMap
- Transitions to the next video in the array (circular navigation)
- Updates active_creator for the new video
- Resets duration counter for new video

#### Exit Function

- Performs final calculations for all creator percentages
- Calculates coin distribution based on watch time percentages
- Updates all creator records with final statistics

### Reward Distribution Algorithm

The system calculates rewards based on the percentage of total watch time each creator received:

1. **Total Watch Time**: Sum of all watch durations across all creators
2. **Creator Percentage**: (Creator's total watch time / Total watch time) × 100
3. **Coin Amount**: (Creator percentage / 100) × Total coins (5)

## Files Structure

```
src/
├── models/
│   ├── Video.ts           # Video class definition
│   ├── Creator.ts         # Creator class and interface
│   ├── VideoFeed.ts       # Main video feed controller
│   └── RewardCalculator.ts # Reward calculation logic
├── VideoWatchingApp.ts    # Main application class
├── test.ts               # Test functions
└── index.ts              # Export barrel file
demo.js                   # Simple demonstration script
```

## Usage Example

```typescript
import { VideoWatchingApp } from "./src/VideoWatchingApp.js";

const app = new VideoWatchingApp();

// Start the application
app.main();

// Simulate watching and transitioning between videos
// ... user interaction ...

// Get current state
const currentInfo = app.getCurrentVideoInfo();
console.log(currentInfo); // { videoId: 'video_1', creatorId: 1, duration: 15.5 }

// Move to next video
app.nextVideo();

// Exit and calculate final rewards
app.exit();
```

## Demonstration

Run the demonstration script to see the system in action:

```bash
node demo.js
```

This will show:

- System initialization
- Video watching simulation
- Creator reward calculations
- Final distribution validation

## Key Implementation Details

### HashMap Implementation

- Uses JavaScript Map for creator tracking
- Each creator ID (1-5) maps to a Creator object
- Automatically initializes creators when first encountered

### Time Tracking

- Uses Date.now() for precise millisecond timing
- Converts to seconds for user-friendly display
- Handles real-time updates during watching

### Circular Video Navigation

- Array index wrapping using modulo operator
- Seamless transition from last video back to first
- Maintains consistent video ordering

### Reward Validation

- Ensures total distributed coins equal the coin counter
- Handles floating-point precision with tolerance checking
- Provides validation feedback

## Benefits of This Architecture

1. **Separation of Concerns**: Each class has a specific responsibility
2. **Scalability**: Easy to add new creators or videos
3. **Testability**: Individual components can be tested independently
4. **Maintainability**: Clear interfaces and well-documented methods
5. **Extensibility**: Easy to add new features like video categories or user preferences

## Future Enhancements

- Add video categories and genre-based tracking
- Implement user preferences and viewing history
- Add more sophisticated reward algorithms
- Include video metadata (duration, tags, etc.)
- Add persistence layer for data storage
- Implement user authentication and profiles
