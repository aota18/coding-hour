# Manual for Building Agile Process

> * Overview
> * Setup
> * Hooks
> * Telegram
> * Pre-commit
> * Pre-Push
> * Result

## Overview

<img src="./src/image-20200520132854862.png" alt="image-20200520132854862" style="zoom:50%;" />

* For the automation system, we used ``hooks`` to create an environment where test and build are automatically executed at the point of commit and push. 
* In order to speed up development process and problems of Multi-platform development environment, the results of test and build were notified to all personnel through the Telegram. 
* As shown in the figure above, Jest was used for unit test when commits are done and when pushing, the docker transmitts image to the server through the docker.

## Setup

* In order to build our agile process environment, you need to follow following step.

1. Create ``.git/hooks`` folder in your repository.

   *  ``.git`` folder is hidden at top directory of your repository

2. Copy and past ``pre-commit`` and ``pre-push`` script to ``.git/hooks``

   * ``pre-commit`` and ``pre-push`` scripts are shown below.
   * Make sure that ``pre-commit`` and ``pre-push`` files are executable. (In case it's not excutable, use ``chmod`` command to change authority.)

3. Install Jest

   ```
   npm install --save-dev jest
   ```

4. Now let's commit or push to see our enviroment is working!





* If you want to build our project through push, consider following guideline. Other wise, there might be failure while pushing.
  * Before build, please connect to our server with ``ssh`` first. 
  * Your last commit message must include a word "#777"
  * You need to have docker account which is granted by our docker system.



## [Hooks Concept]([https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks](https://git-scm.com/book/ko/v2/Git맞춤-Git-Hooks))

> Hooks are scripts that run automatically when an event occurs.

<img src="./src/image-20200527123639653.png" alt="image-20200527123639653" style="zoom:30%;" />

* Hooks can be used to automatically execute jest or dockers through the cmd of ``$ git commit`` or ``$ git push``.
* Hooks is a file that exists in ``./.git/hooks`` when a new repository is created. There are two things to look around.
  1.  ``./git`` does not serve as a commit. That is, it is managed independently from the repository. 
  2.  The hooks folder is created in .git only through git ``init`` function. (If not, it can be created by manually.)
* Hooks files should be managed independently from git. In case of team-by-team operation individuals have to set their own hooks file.
* We can set the files of the hooks that we will use under name of ``pre-commits`` and ``pre-push``. 
  *  ``pre-commits.samle`` and ``pre-push.Sample`` is not necessary to operate because it explains how to write hooks. 

```
.git
└──hooks
	 ├── pre-commits.sample
	 ├── pre-push.sample
	 ├── ....
	 ├── ....
   ├── pre-commits
   └── pre-push
```

## [Telegram](https://core.telegram.org/bots/api)

> Briefly describe the Telegram before further explaining Hooks.

<img src="https://core.telegram.org/file/811140327/1/zlN4goPTupk/9ff2f2f01c4bd1b013" alt="Bots: An introduction for developers" style="zoom:15%;" />

* Public channels that continuously forward commit messages and push messages are as follows. 
  * https://t.me/CHReportRoom
* Telegram provides a convenient bot API. Using Bottom's API, you can automatically share information about commit contents and build with team members about commit and push
* In order to share the channel in which Telegram Bot participated with the team members, the public channel should appoint the adminstarter as a bot and invite the team members to use it.

## Pre-Commit

> * This is script of  ``pre-commit``

```sh
#!/bin/sh



#./node_modules/.bin/jest --coverage
# An example hook script to prepare a packed repository for use over
# dumb transports.
#

#You can get yout chat id by interacting with telegram channel called "GetID Bot"
CHAT_ID='-1001163861245'

#BOT_TOKEN number is shown when you generated your bot in BotFather channel
BOT_TOKEN='1274271735:AAF0vky2hVKZLxgz1ByQX119nHz_Y13kg4k'

#This is URL format of Telegram API
URL="https://api.telegram.org/bot$BOT_TOKEN/sendMessage"

PRE_COMMIT_MES=$(./node_modules/.bin/jest --coverage)

NEW_LINE="
"
#$(echo $e "\n")

USERNAME=$(git config user.name)
AUTHOR=$(echo Author: $USERNAME)
TEST=$(echo "JEST Test:")
COMMIT=$(echo "[C O M M I T]")

curl -s -X POST $URL -d chat_id=$CHAT_ID -d text="$COMMIT $NEW_LINE $NEW_LINE $AUTHOR $NEW_LINE $NEW_LINE $TEST $NEW_LINE $PRE_COMMIT_MES"
```

* ``CHAT_ID``:  means public channel id. The actual id of the public channel is the number excluding prefix of -100.
  * To check the id of the public channel, connect the telegram to the web and check the url to see that it is part of the last number.
* ``BOT_TOKEN``: It's Bot's number. This token bot sends a message to the channel defined in ``CHAT_ID``
* ``URL``: we use url for sennding Message throufh API.
  * "sendMessage"  is API from Telegram.
* ``PRE_COMMIT_MES``: This is result of test from running Jest
* :warning: Caution
  * ``jest`` must be installed to run the unit test. 
  * You can simplt run ``yarn add --dev jest`` or ``npm install --save-dev jest`` to install.

## Pre-push

> * This is script of  ``pre-push``

```sh
#!/bin/sh

CHAT_ID='-1001163861245'

#BOT_TOKEN number is shown when you generated your bot in BotFather channel
BOT_TOKEN='1274271735:AAF0vky2hVKZLxgz1ByQX119nHz_Y13kg4k'

#This is URL format of Telegram API
URL="https://api.telegram.org/bot$BOT_TOKEN/sendMessage"


NEW_LINE="
"
LAST_COMMIT=$(git --no-pager log -1)
EXE_DOCKER=$(echo "Nice Push")


USERNAME=$(git config user.name)
PUSH=$(echo "[PUSH]")
GIT_LOG_MSG=$(git --no-pager log -1)
GIT_LOG=$(git --no-pager log -1 | grep -w -o  "#777")

TEST_STR=$(echo Docs#2)
BUILD_STR=$(echo "#777")




if [[ $GIT_LOG == $BUILD_STR ]];then

    echo BUILD
    EXE_DOCKER=$(./docker-push.sh)

elif [[ $GIT_LOG == $TEST_STR ]];then

    echo TEST
    EXE_DOCKER=$(echo "TEST PUSH")

else

    echo PUSH
    EXE_DOCKER=$(echo pre-pushing.........)
fi

curl -s -X POST $URL -d chat_id=$CHAT_ID -d text="$PUSH $NEW_LINE $NEWLINE $GIT_LOG_MSG  $NEW_LINE $EXE_DOCKER"
```

* ``LAST_COMMIT``: the last commit message from git log command
* ``GIT_LOG``: this variable catches "#777" from git log, if the last commit message contains a word "#777". 
  * Thus, if user did not type "#777" , only push to the remote repository will be done.
  * If ``GIT_LOG`` is "#777", the script will run "docker-push.sh" to build and send the docker image to the server.
  * If any failure has occurred, the failed massege will be shown in telegram.
* ``EXE_DOCKER``: this is variable contains result message for push.



## Result

* If we write the files of ``pre-commit`` and ``pre-push`` in '.git/hooks' and connect the channels in the telegram, we can then see the test and build information about commits and push.

* The message will be shown in https://t.me/CHReportRoom

* Example

  | pre-commit message                                           | pre-push message                                             |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | ![Screen Shot 2020-05-27 at 1.35.19 PM](./src/Screen Shot 2020-05-27 at 1.35.19 PM.png) | ![Screen Shot 2020-05-27 at 1.35.36 PM](./src/Screen Shot 2020-05-27 at 1.35.36 PM.png) |

