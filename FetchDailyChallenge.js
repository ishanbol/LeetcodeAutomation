require('dotenv').config();

let baseURL = "https://leetcode.com/graphql/"

let fetchDailyChallengePayload = {
    "query": "\n    query questionOfToday {\n  activeDailyCodingChallengeQuestion {\n    date\n    userStatus\n    link\n    question {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId: questionFrontendId\n      isFavor\n      paidOnly: isPaidOnly\n      status\n      title\n      titleSlug\n      hasVideoSolution\n      hasSolution\n      topicTags {\n        name\n        id\n        slug\n      }\n    }\n  }\n}\n    ",
    "variables": {},
    "operationName": "questionOfToday"
}

let getQuestionIdPayload = {
    "query": "\n    query questionTitle($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    title\n    titleSlug\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    categoryTitle\n  }\n}\n    ",
    "variables": {
      "titleSlug": "maximum-length-of-a-concatenated-string-with-unique-characters"
    },
    "operationName": "questionTitle"
  }

  let submissionStatusPayload = {
    "query": "\n    query submissionDetails($submissionId: Int!) {\n  submissionDetails(submissionId: $submissionId) {\n    runtime\n    runtimeDisplay\n    runtimePercentile\n    runtimeDistribution\n    memory\n    memoryDisplay\n    memoryPercentile\n    memoryDistribution\n    code\n    timestamp\n    statusCode\n    user {\n      username\n      profile {\n        realName\n        userAvatar\n      }\n    }\n    lang {\n      name\n      verboseName\n    }\n    question {\n      questionId\n      titleSlug\n      hasFrontendPreview\n    }\n    notes\n    flagType\n    topicTags {\n      tagId\n      slug\n      name\n    }\n    runtimeError\n    compileError\n    lastTestcase\n    totalCorrect\n    totalTestcases\n    fullCodeOutput\n    testDescriptions\n    testBodies\n    testInfo\n  }\n}\n    ",
    "variables": {
      "submissionId": 1155342245
    },
    "operationName": "submissionDetails"
  }

let FetchingSolutionsPayload  = {
    "query": "\n    query communitySolutions($questionSlug: String!, $skip: Int!, $first: Int!, $query: String, $orderBy: TopicSortingOption, $languageTags: [String!], $topicTags: [String!]) {\n  questionSolutions(\n    filters: {questionSlug: $questionSlug, skip: $skip, first: $first, query: $query, orderBy: $orderBy, languageTags: $languageTags, topicTags: $topicTags}\n  ) {\n    hasDirectResults\n    totalNum\n    solutions {\n      id\n      title\n      commentCount\n      topLevelCommentCount\n      viewCount\n      pinned\n      isFavorite\n      solutionTags {\n        name\n        slug\n      }\n      post {\n        id\n        status\n        voteStatus\n        voteCount\n        creationDate\n        isHidden\n        author {\n          username\n          isActive\n          nameColor\n          activeBadge {\n            displayName\n            icon\n          }\n          profile {\n            userAvatar\n            reputation\n          }\n        }\n      }\n      searchMeta {\n        content\n        contentType\n        commentAuthor {\n          username\n        }\n        replyAuthor {\n          username\n        }\n        highlights\n      }\n    }\n  }\n}\n    ",
    "variables": {
      "query": "",
      "languageTags": [
        "cpp"
      ],
      "topicTags": [],
      "questionSlug": "maximum-length-of-a-concatenated-string-with-unique-characters",
      "skip": 0,
      "first": 3,
      "orderBy": "most_votes"
    },
    "operationName": "communitySolutions"
  }

  let communitySolutionPayload = {
    "query": "\n    query communitySolution($topicId: Int!) {\n  topic(id: $topicId) {\n    id\n    viewCount\n    topLevelCommentCount\n    subscribed\n    title\n    pinned\n    solutionTags {\n      name\n      slug\n    }\n    hideFromTrending\n    commentCount\n    isFavorite\n    post {\n      id\n      voteCount\n      voteStatus\n      content\n      updationDate\n      creationDate\n      status\n      isHidden\n      author {\n        isDiscussAdmin\n        isDiscussStaff\n        username\n        nameColor\n        activeBadge {\n          displayName\n          icon\n        }\n        profile {\n          userAvatar\n          reputation\n        }\n        isActive\n      }\n      authorIsModerator\n      isOwnPost\n    }\n  }\n}\n    ",
    "variables": {
      "topicId": 4611457
    },
    "operationName": "communitySolution"
  }
  
  let submitPayload = {
    "lang": "cpp",
    "question_id": "1360",
    "typed_code": "class Solution {\npublic:\n    int maxLength(vector<string>& arr) {\n        \n    }\n};"
  }


async function getDailyChallenge() {
    let response = await fetch(baseURL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":process.env.COOKIE,
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": process.env.X_CSRF_TOKEN
        },
        body: JSON.stringify(fetchDailyChallengePayload)
    }).then(res=>res.json()).catch(err=>{console.log("ERROR :",err)})
    console.log("getDailyChallenge:",response.data.activeDailyCodingChallengeQuestion.question)

    return response.data.activeDailyCodingChallengeQuestion.question.titleSlug
}

async function loadSolutions(slug){
    let payload = FetchingSolutionsPayload
    payload.questionSlug = slug
    payload.variables.questionSlug = slug
    let response = await fetch(baseURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":process.env.COOKIE,
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": process.env.X_CSRF_TOKEN
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))
    // console.log(response.data.questionSolutions.solutions)
    return response.data.questionSolutions.solutions
}

function extractCppCode(content) {
    // Regular expression to match code blocks in the provided content
    const codeBlockRegex = /```C\+\+ \[\](.*?)```/s;

    // Match the code block
    const matches = content.match(codeBlockRegex);

    // Check if there is a match and return the code or an empty string
    return matches ? matches[1].trim() : "";
}

async function fetchSolution(topicID) {
    let payload = communitySolutionPayload
    payload.variables.topicId = topicID
    let response = await fetch(baseURL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":process.env.COOKIE,
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": process.env.X_CSRF_TOKEN
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))

    let cppCode = response.data.topic.post.content
    cppCode = extractCppCode(cppCode)
    cppCode.replace(/\\n/g, "");
    return cppCode
}

async function submissionStatus(submissionID){
    let payload = submissionStatusPayload
    payload.variables.submissionId = submissionID

    let response = await fetch(baseURL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":process.env.COOKIE,
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": process.env.X_CSRF_TOKEN
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))

    return response.data.submissionDetails.statusCode === 10
}

async function getQuestionID(slug){
    let payload = getQuestionIdPayload
    payload.variables.titleSlug  = slug
    let response = await fetch(baseURL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":process.env.COOKIE,
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": process.env.X_CSRF_TOKEN
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))

    console.log(response)
    return response.data.question.questionId
}
async function submitSolution(cppCode,question_ID,slug){
    let payload = submitPayload
    payload.question_id = question_ID
    payload.typed_code = cppCode
    let submitURL = "https://leetcode.com/problems/"+ slug+"/submit/"
    let response = await fetch(submitURL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":process.env.COOKIE,
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": process.env.X_CSRF_TOKEN
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))

    console.log(response)
    return response
}

async function main(){
     let titleSlug = await getDailyChallenge()
     console.log(titleSlug)
     let questionID = await getQuestionID(titleSlug)
     console.log(questionID)
    let communitySolutions = await loadSolutions(titleSlug)
    console.log(communitySolutions)

    for (let index in communitySolutions) {
        let cppCode = await fetchSolution(communitySolutions[index].id)
        // submit the CPP CODE 
        let finalCode = cppCode.replace(/\\n/g, "").replace(/\\/g, "")
        if (finalCode) {
            // setTimeout(async () => {
                let submitStatus = await submitSolution(finalCode,questionID,titleSlug)
                let submissionSuccess = await submissionStatus(submitStatus.submission_id)
                if (submissionSuccess){
                    sendTelegramNotification(`Today LeetCode Daily Challenge Submission Succes. ${submissionStatus.submission_id}`) 
                    break
                } 
            // }, 600);
        }       
    }
    
}

main()


// Adding An Notification on Code Submission Success

async function sendTelegramNotification(message) {
    let telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    let telegramChatId = process.env.TELEGRAM_CHAT_ID
    try {
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message,
            }),
        }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))
        //Notification Send Success


    } catch (error) {
        console.error('Error sending Telegram notification:', error.message);
    }
}



