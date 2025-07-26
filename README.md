# Technical Test - Backend Engineer

## Problem Description

LawnMower Solutions is building an automatic lawn mower designed to mow rectangular surfaces. The mower can be programmed to mow the entire surface.

The position of the mower can be represented by coordinates (x,y) and by a letter giving the cardinal direction (N,E,W,S). The lawn is divided into a grid to simplify the navigation. For example, a mower position can be "0, 0, N", it means that this mower is located at the lower-left corner of the lawn, and it is oriented North.

The mower is controlled by sending it a sequence of letters. Possible letters are "R", "L" and "F":

- "R" and "L" make the mower rotate 90° respectively to the right or to the left, without moving
- "F" means that the mower is moving forward on the cell in front of it, without changing its orientation

If the position after the move is outside the lawn, then the mower does not move, it keeps its orientation and processes the next command.

The cell directly at North of the position (x, y) has coordinates (x, y+1).

## Input Format

An input file following these rules is given to program the mower:

- The first line is the coordinates of the upper-right corner of the lawn, coordinates of lower-left corner are supposed to be (0,0)
- Next lines of the file drive all mowers. There are two lines for each mower:
  - First line gives the initial position and orientation of the mower. Position and orientation are given by 2 numbers and a letter, separated by a space
  - Second line is a sequence of instructions driving the mower across the lawn. Instructions are a sequence of letters without space

Each mower moves sequentially, it means that the second mower moves only after the first one executes all its instructions.

When the mower has executed all its instructions, it outputs its position and orientation.

### Test Case

Input file (`instructions.txt`):

```
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF
```

Expected output:

```
1 3 N
5 1 E
```

## Installation

1. Make sure you have Node.js installed (version 18 or higher recommended)
2. Install pnpm if not already installed:
   ```bash
   npm install -g pnpm
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build:
   ```bash
   pnpm build
   ```

## Usage

1. Create an instructions file (or use the provided `instructions.txt`)
2. Run the command:
   ```bash
   pnpm start:prod mow instructions.txt
   ```

The command will display each mower's final position after it completes all its instructions.

## Architecture

The project follows Domain-Driven Design (DDD) principles with a hexagonal architecture:

- `domain/`: Contains entities, value objects, and ports that define the core business logic
- `application/`: Contains use cases that orchestrate business operations
- `infrastructure/`: Contains adapters, commands, and technical implementations

## Testing

To run the tests:

```bash
pnpm test
```

To run the e2e tests:

```bash
pnpm test:e2e
```
