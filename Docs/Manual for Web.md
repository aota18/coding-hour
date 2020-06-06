# Coding Hour

> * Introduction
> * Setup
> * Build
> * Deploy

### Introduction

*  Coding Hour is a class session helps students who need some help from the class they are taking. 
* Our service is a plaftorm which provides the space where the tutor and tutee can communicate and some features to help the administrator of the class manage their class.

## Getting Started

### Setup
* Let's Get started with intsalling dev enviorment! 

* First, You can clone our source code from [Coding Hour](https://github.com/aota18/coding-hour)
  ```shell
  $ git clone &lt; git-url 
  ```
  
*  After the cloning, now you can see the internal file structure of our project.
  ```

  coding-hour/

  |

  |----- kostack/

  |----- rastack/

  |----- docker-compose.yml

  |----- docker-push.sh

  |....
  ```
  
* kostack : Server (NodeJS) Folder 

* rastack : Client (ReactJS) Folder 

* docker-compose.yml : Docker Configuration File 

* docker-push.sh : Bash Script for automated deploy

### Build

>  Next, You have to run the server and client program.

* In **kostack**  folder,
	```shell
  $ yarn start:dev
  ```
* After this command, the server program will run in address [localhost:3001](http://localhost:3001)

* Next, In <b>rastack/coding-hour</b> folder,
	``` 
	$ npm install
	```
* After this command, the client program will run in address [localhost:3000](http://localhost:3000)


### How to Deploy
* After you update your application, you have to deploy your application to the server All you have to do is just execute one bash file : ``docker-push.sh``.

  ```shell
  $ ./docker-push.sh
  ```


* Congratulations! Now You've deployed your application to AWS Server! Isn't it amazing?!
