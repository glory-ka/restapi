Rest Api Assignment
===================

**Description:** This is a simple Rest Api application that responds to client request. The Api is built as a survey management plateform where client can access survey information and create any 'published' survey detail.

USAGE
-----
This is a typical Api which means the client can make request, post data, alter the data and delete data using GET, POST, PUT and DELETE methods, respectively.
The format of the data for PUT, POST and DELETE is given bellow.

To get started, you need to run the populate.js file which is has the execute permission bit set on linux. This file contains initial information that would be fed to your database (MongoDB).
Not all data would be necessary. You can decide to remove the initial Survey creation and response, however, the Api needs User data to work. I didn't use a true UUID to for user ( what I mean by true is the length of the string that a typical UUID application would generate. The UUIDs I have used are more akin to passwords, weak passwords).

Do the Following to run populate.js:
```bash
command-prompt$ ./populate 'mongodb+srv://<username>:<password>@cluster0.9fhcb.mongodb.net/?retryWrites=true&w=majority'

```

The second argument is the 

GET
---

* List servey published by a user:
    * __Route__: orangutan/survey/published?firstname=xxx&lastname=xx

* List all survery published but not yet closed:
    * __Route__: orangutan/survey/published

* Get all detail for specific servey:
    * __Route__: orangutan/survey/:name/detail

* Get response Count:
    * __Route__: orangutan/survey/:name/count

__getHandler.ListPublishedSurvey__
__getHandler.serveyDetail__
__getHandler.serveyResponseCount__


POST
----
* Respond to a servery:
    * __Route__: orangutan/survey/:name/response

    ```json
    {
        userId: xxx,
        response: xxx
    }
    ```

* Respond with a answer different from the selected Answers:
    * __Route__: orangutan/survery/:name/otherResponse

    ```json
    {
        userId: xxx,
        response: xxx
    }
    ```

* Create a new Survey
    * __Route__: orangutan/survey/:name/create

    ```json
    {
        userId: xxxx,
        status: [ published | unpublished ],
        date_open: year-month-dayThour:minutes:seconds.milliseconds+00:00,
        date_close: year-month-dayThour:minutes:seconds.milliseconds+00:00,
        question: {
            question: "What is the strongest metal",
            answer1: xxxx
            answer2: xxxx,
            answer3: xxxx
            ...
            answerx: xxxx
        }
    }
    ```
**Note:** I could have hide the survey name (:name) in the body of the request, but I will the express **parms** object with some values. Bad design but works.

__postHandler.respondToSurvey__
__postHandler.otherResponse__
__postHandler.createNewSurvey__


PUT
------
* Change question of an unpublished servery:
    * __Route__: orangutan/survey/:name/updateQuestion

    ```json
    {
        ownerId: xxx,
        question: xxxx
    }
    ```

* Set a servey from unpublished to published:
    * __Route__: orangutan/survey/:name/updateStatus

     ```json
    {
        ownerId: xxx,
        status: ['published' | 'unpublished']
    }
    ```

__updateHandler.changeQuestionStatus__
__updateHandler.changeServeryQuestion__


DELETE
------
* Delete a user Response:
    * __Route__: orangutan/survey/:name/delete

    ```json
    {
        ownerId: xxx,
        firstname: xxx,
        lastname: xxx
    }
    ```

* Delete a servey:
    * __Route__: oranguton/survey/:name/delete

    ```json
    {
        ownerId: xxx,
    }
    ```

__putHandler.deleteUserResponse__
__putHandler.deleteSurvey__


Data Format
-----------
* **Survey**
```json
{
  name: String
  userName: String
  date open: DateTime
  date close: DateTime
  status [publish/unpublish]: String
  question:
  {
    question: String,
    answer:
    {
       answer1: String,
       answer2: String,
       ....
       answerX: String
    {
  }
}
```

* **Response**
```json
{
  user: ObjectRef -> User,
  response: String,
  otherResponse: String,
  survey: ObjectRef -> Survey
}
```

* **User**

```json
{
    firstname: String,
    lastname: String,
    userUUID: String
}
```


CONDITION
---------

* Create survey if servey name doesn't exit
* User can POST a response if they haven't already submitted a response.
    And their answer is one of the possible answers.
* However, use can use altenative route/url to give a different answer.
    That answer should however not match any predefined answer.
* Only the owner of a survey can delete or update its content.
* User can only query information about published surveys.