# Swarmer Docker Swarm Sample
This project is a sample project for showing some basics of using docker, docker compose and docker swarm.

## Set Up & Prerequisites

For this sample you'll need Docker and NodeJS installed. Some familarity with JavaScript and Express applications is helpful but not required

1. [Install Docker](https://docs.docker.com/install/)
1. [Install NodeJS](https://nodejs.org/en/download/)

## Database Set Up

This application during development can use a local mongodb and redis db if desired. To do so then you'll need to edit the config/default.yml file to point to your local installs and probably update the port.

Otherwise we have provided a local docker compose file which will run mongodb and redis in Docker Containers for you locally. If this is your first experience with Docker then this is a great way to see one of the benefits of using Docker during development.

*Please Note: We're running our databases on alternative ports in order to not conflict with any existing installs.*

To start up the databases during development run

``docker-compose -f docker-compose.db.yml up``

If you want to keep these databases up during the development pass the '-d' flag to run in detached mode which will keep these running in the background.

``docker-compose -f docker-compose.db.yml up -d``

To stop these running instances run:

``docker-compose -f docker-compose.db.yml down``


## Install

To install the necessary packages using yarn (we wrote this tutorial using yarn for so its best to use that)

``yarn install``

## Running

1. Make sure your databases are running
1. Run ``yarn start``