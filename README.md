# Supercell Discord Bot

A Discord bot for Clash of Clans players, providing player stats, clan details, and more.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Supercell is a Discord bot designed to enhance the experience of Clash of Clans players. It allows users to retrieve player statistics, clan information, and other game-related data directly within Discord. The bot also supports multiple languages, making it accessible to a global audience.

## Features

- Retrieve detailed player stats (e.g., trophies, town hall level, clan role).
- Generate player cards with visual stats.
- Support for multiple languages (e.g., English, French).
- Set a default language for each user.
- Fetch clan details and contributions.
- Easy-to-use slash commands.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/sachawoody/Supercell.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Supercell
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and configure the following variables:
    ```
    DISCORD_TOKEN=your-discord-bot-token
    COC_API_TOKEN=your-clash-of-clans-api-token
    ```
5. Start the bot:
    ```bash
    npm start
    ```

## Usage

Once the bot is running, invite it to your Discord server and use the available slash commands to interact with it. For example:
- `/player tag:#PLAYER_TAG` - Retrieve player stats.
- `/setlang language:en` - Set your default language.

## Commands

| Command       | Description                                   |
|---------------|-----------------------------------------------|
| `/player`     | Fetch and display player stats.              |
| `/setlang`    | Set your preferred language.                 |
| `/clan`       | Retrieve information about a specific clan.  |

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a branch for your changes:
    ```bash
    git checkout -b feature/feature-name
    ```
3. Commit your changes and push your branch:
    ```bash
    git commit -m "Add feature description"
    git push origin feature/feature-name
    ```
4. Open a Pull Request.

## License

This project is licensed under the MIT License. For more details, please refer to the `LICENSE` file.