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
            "Cookie":"_gid=GA1.2.2012173309.1705940301; gr_user_id=3d1b126e-4f9f-4682-90e6-7856380e7b0b; 87b5a3c3f1a55520_gr_last_sent_cs1=squat_er; csrftoken=7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL; messages=.eJyljssKwjAQRX9lyDqW4GPhTvATXEkpYUimNdJkaCYp-vcWFFfiQrcXzrmnbZW1V-FkI4ngQEobvTZaHTn1IUcsgRPQKmIYQSgVKAw3zsHTZr81hyGjiKe5cRwb1emPup1Wp-rcsvR1HO8gYUjkISRAAZkqFkv5G33mChecCdyzaoF_aHhbXv9cy9_J3QM8cG3t:1rRxec:sH5QmWZVx77FL1E1YDhQH1mRfd5HWNPwg1YpW83ql0U; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTIxMzAxMjYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImQzMDAyNWEwMjAzZDAyNWY3NzZlMDZlMzJlMmFlYTRjMmYwYjM4ZWJjNDUxNWM4MmI5NzdhNWJiYzg4NTQ5NWIiLCJpZCI6MTIxMzAxMjYsImVtYWlsIjoieG9yaWRlMzk0MEBncmFzc2Rldi5jb20iLCJ1c2VybmFtZSI6InNxdWF0X2VyIiwidXNlcl9zbHVnIjoic3F1YXRfZXIiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNzA1OTQyODEwLCJpcCI6IjIwMi42NS4xMzMuMTk0IiwiaWRlbnRpdHkiOiI4MjE3ODliOTlmOTE2ODMzMGIwNjM3OWM1MzgxMzgwMCIsInNlc3Npb25faWQiOjU0MDc4ODM5LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.60-oh2SoDkvv6DW42usgIcklLhBod8J9fJyDdLc1V_4; 87b5a3c3f1a55520_gr_session_id=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_session_id_sent_vst=8c622fb2-da5a-4918-ac21-8dc67f7aee66; __gads=ID=7c3097e7a1922a56:T=1705940724:RT=1705995061:S=ALNI_MYYle2RkDkZn4MSqKOxcoBSJHyC0Q; __gpi=UID=00000cedb40d0daa:T=1705940724:RT=1705995061:S=ALNI_MY7V04YB7kbApoQOu9Fbhi-92t1hg; _dd_s=rum=0&expire=1705996094247; _gat=1; __stripe_mid=c811b025-bf4b-4d5f-9938-a1a43836f0b98f5dda; __stripe_sid=a973374c-1d35-4dc9-b892-358953c475fe299e23; 87b5a3c3f1a55520_gr_cs1=squat_er; _ga=GA1.1.138240765.1705940301; _ga_CDRWKZTDEX=GS1.1.1705995060.2.1.1705995216.38.0.0",
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": "7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL"
        },
        body: JSON.stringify(fetchDailyChallengePayload)
    }).then(res=>res.json()).catch(err=>{console.log("ERROR :",err)})
    console.log("getDailyChallenge:",response.data.activeDailyCodingChallengeQuestion.question)

    return response.data.activeDailyCodingChallengeQuestion.question.titleSlug
}

async function loadSolutions(slug){
    let payload = FetchingSolutionsPayload
    payload.questionSlug = slug
    let response = await fetch(baseURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":"_gid=GA1.2.2012173309.1705940301; gr_user_id=3d1b126e-4f9f-4682-90e6-7856380e7b0b; 87b5a3c3f1a55520_gr_last_sent_cs1=squat_er; csrftoken=7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL; messages=.eJyljssKwjAQRX9lyDqW4GPhTvATXEkpYUimNdJkaCYp-vcWFFfiQrcXzrmnbZW1V-FkI4ngQEobvTZaHTn1IUcsgRPQKmIYQSgVKAw3zsHTZr81hyGjiKe5cRwb1emPup1Wp-rcsvR1HO8gYUjkISRAAZkqFkv5G33mChecCdyzaoF_aHhbXv9cy9_J3QM8cG3t:1rRxec:sH5QmWZVx77FL1E1YDhQH1mRfd5HWNPwg1YpW83ql0U; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTIxMzAxMjYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImQzMDAyNWEwMjAzZDAyNWY3NzZlMDZlMzJlMmFlYTRjMmYwYjM4ZWJjNDUxNWM4MmI5NzdhNWJiYzg4NTQ5NWIiLCJpZCI6MTIxMzAxMjYsImVtYWlsIjoieG9yaWRlMzk0MEBncmFzc2Rldi5jb20iLCJ1c2VybmFtZSI6InNxdWF0X2VyIiwidXNlcl9zbHVnIjoic3F1YXRfZXIiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNzA1OTQyODEwLCJpcCI6IjIwMi42NS4xMzMuMTk0IiwiaWRlbnRpdHkiOiI4MjE3ODliOTlmOTE2ODMzMGIwNjM3OWM1MzgxMzgwMCIsInNlc3Npb25faWQiOjU0MDc4ODM5LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.60-oh2SoDkvv6DW42usgIcklLhBod8J9fJyDdLc1V_4; 87b5a3c3f1a55520_gr_session_id=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_session_id_sent_vst=8c622fb2-da5a-4918-ac21-8dc67f7aee66; __gads=ID=7c3097e7a1922a56:T=1705940724:RT=1705995061:S=ALNI_MYYle2RkDkZn4MSqKOxcoBSJHyC0Q; __gpi=UID=00000cedb40d0daa:T=1705940724:RT=1705995061:S=ALNI_MY7V04YB7kbApoQOu9Fbhi-92t1hg; _dd_s=rum=0&expire=1705996094247; _gat=1; __stripe_mid=c811b025-bf4b-4d5f-9938-a1a43836f0b98f5dda; __stripe_sid=a973374c-1d35-4dc9-b892-358953c475fe299e23; 87b5a3c3f1a55520_gr_cs1=squat_er; _ga=GA1.1.138240765.1705940301; _ga_CDRWKZTDEX=GS1.1.1705995060.2.1.1705995216.38.0.0",
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": "7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL"
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
            "Cookie":"_gid=GA1.2.2012173309.1705940301; gr_user_id=3d1b126e-4f9f-4682-90e6-7856380e7b0b; 87b5a3c3f1a55520_gr_last_sent_cs1=squat_er; csrftoken=7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL; messages=.eJyljssKwjAQRX9lyDqW4GPhTvATXEkpYUimNdJkaCYp-vcWFFfiQrcXzrmnbZW1V-FkI4ngQEobvTZaHTn1IUcsgRPQKmIYQSgVKAw3zsHTZr81hyGjiKe5cRwb1emPup1Wp-rcsvR1HO8gYUjkISRAAZkqFkv5G33mChecCdyzaoF_aHhbXv9cy9_J3QM8cG3t:1rRxec:sH5QmWZVx77FL1E1YDhQH1mRfd5HWNPwg1YpW83ql0U; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTIxMzAxMjYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImQzMDAyNWEwMjAzZDAyNWY3NzZlMDZlMzJlMmFlYTRjMmYwYjM4ZWJjNDUxNWM4MmI5NzdhNWJiYzg4NTQ5NWIiLCJpZCI6MTIxMzAxMjYsImVtYWlsIjoieG9yaWRlMzk0MEBncmFzc2Rldi5jb20iLCJ1c2VybmFtZSI6InNxdWF0X2VyIiwidXNlcl9zbHVnIjoic3F1YXRfZXIiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNzA1OTQyODEwLCJpcCI6IjIwMi42NS4xMzMuMTk0IiwiaWRlbnRpdHkiOiI4MjE3ODliOTlmOTE2ODMzMGIwNjM3OWM1MzgxMzgwMCIsInNlc3Npb25faWQiOjU0MDc4ODM5LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.60-oh2SoDkvv6DW42usgIcklLhBod8J9fJyDdLc1V_4; 87b5a3c3f1a55520_gr_session_id=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_session_id_sent_vst=8c622fb2-da5a-4918-ac21-8dc67f7aee66; __gads=ID=7c3097e7a1922a56:T=1705940724:RT=1705995061:S=ALNI_MYYle2RkDkZn4MSqKOxcoBSJHyC0Q; __gpi=UID=00000cedb40d0daa:T=1705940724:RT=1705995061:S=ALNI_MY7V04YB7kbApoQOu9Fbhi-92t1hg; _dd_s=rum=0&expire=1705996094247; _gat=1; __stripe_mid=c811b025-bf4b-4d5f-9938-a1a43836f0b98f5dda; __stripe_sid=a973374c-1d35-4dc9-b892-358953c475fe299e23; 87b5a3c3f1a55520_gr_cs1=squat_er; _ga=GA1.1.138240765.1705940301; _ga_CDRWKZTDEX=GS1.1.1705995060.2.1.1705995216.38.0.0",
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": "7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))

    let cppCode = response.data.topic.post.content
    cppCode = extractCppCode(cppCode)
    cppCode.replace(/\\n/g, "");
    return cppCode
}

async function getQuestionID(slug){
    let payload = getQuestionIdPayload
    payload.variables.titleSlug  = slug
    let response = await fetch(baseURL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Cookie":"_gid=GA1.2.2012173309.1705940301; gr_user_id=3d1b126e-4f9f-4682-90e6-7856380e7b0b; 87b5a3c3f1a55520_gr_last_sent_cs1=squat_er; csrftoken=7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL; messages=.eJyljssKwjAQRX9lyDqW4GPhTvATXEkpYUimNdJkaCYp-vcWFFfiQrcXzrmnbZW1V-FkI4ngQEobvTZaHTn1IUcsgRPQKmIYQSgVKAw3zsHTZr81hyGjiKe5cRwb1emPup1Wp-rcsvR1HO8gYUjkISRAAZkqFkv5G33mChecCdyzaoF_aHhbXv9cy9_J3QM8cG3t:1rRxec:sH5QmWZVx77FL1E1YDhQH1mRfd5HWNPwg1YpW83ql0U; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTIxMzAxMjYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImQzMDAyNWEwMjAzZDAyNWY3NzZlMDZlMzJlMmFlYTRjMmYwYjM4ZWJjNDUxNWM4MmI5NzdhNWJiYzg4NTQ5NWIiLCJpZCI6MTIxMzAxMjYsImVtYWlsIjoieG9yaWRlMzk0MEBncmFzc2Rldi5jb20iLCJ1c2VybmFtZSI6InNxdWF0X2VyIiwidXNlcl9zbHVnIjoic3F1YXRfZXIiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNzA1OTQyODEwLCJpcCI6IjIwMi42NS4xMzMuMTk0IiwiaWRlbnRpdHkiOiI4MjE3ODliOTlmOTE2ODMzMGIwNjM3OWM1MzgxMzgwMCIsInNlc3Npb25faWQiOjU0MDc4ODM5LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.60-oh2SoDkvv6DW42usgIcklLhBod8J9fJyDdLc1V_4; 87b5a3c3f1a55520_gr_session_id=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_session_id_sent_vst=8c622fb2-da5a-4918-ac21-8dc67f7aee66; __gads=ID=7c3097e7a1922a56:T=1705940724:RT=1705995061:S=ALNI_MYYle2RkDkZn4MSqKOxcoBSJHyC0Q; __gpi=UID=00000cedb40d0daa:T=1705940724:RT=1705995061:S=ALNI_MY7V04YB7kbApoQOu9Fbhi-92t1hg; _dd_s=rum=0&expire=1705996094247; _gat=1; __stripe_mid=c811b025-bf4b-4d5f-9938-a1a43836f0b98f5dda; __stripe_sid=a973374c-1d35-4dc9-b892-358953c475fe299e23; 87b5a3c3f1a55520_gr_cs1=squat_er; _ga=GA1.1.138240765.1705940301; _ga_CDRWKZTDEX=GS1.1.1705995060.2.1.1705995216.38.0.0",
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": "7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL"
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
            "Cookie":"_gid=GA1.2.2012173309.1705940301; gr_user_id=3d1b126e-4f9f-4682-90e6-7856380e7b0b; 87b5a3c3f1a55520_gr_last_sent_cs1=squat_er; csrftoken=7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL; messages=.eJyljssKwjAQRX9lyDqW4GPhTvATXEkpYUimNdJkaCYp-vcWFFfiQrcXzrmnbZW1V-FkI4ngQEobvTZaHTn1IUcsgRPQKmIYQSgVKAw3zsHTZr81hyGjiKe5cRwb1emPup1Wp-rcsvR1HO8gYUjkISRAAZkqFkv5G33mChecCdyzaoF_aHhbXv9cy9_J3QM8cG3t:1rRxec:sH5QmWZVx77FL1E1YDhQH1mRfd5HWNPwg1YpW83ql0U; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTIxMzAxMjYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImQzMDAyNWEwMjAzZDAyNWY3NzZlMDZlMzJlMmFlYTRjMmYwYjM4ZWJjNDUxNWM4MmI5NzdhNWJiYzg4NTQ5NWIiLCJpZCI6MTIxMzAxMjYsImVtYWlsIjoieG9yaWRlMzk0MEBncmFzc2Rldi5jb20iLCJ1c2VybmFtZSI6InNxdWF0X2VyIiwidXNlcl9zbHVnIjoic3F1YXRfZXIiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNzA1OTQyODEwLCJpcCI6IjIwMi42NS4xMzMuMTk0IiwiaWRlbnRpdHkiOiI4MjE3ODliOTlmOTE2ODMzMGIwNjM3OWM1MzgxMzgwMCIsInNlc3Npb25faWQiOjU0MDc4ODM5LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.60-oh2SoDkvv6DW42usgIcklLhBod8J9fJyDdLc1V_4; 87b5a3c3f1a55520_gr_session_id=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=8c622fb2-da5a-4918-ac21-8dc67f7aee66; 87b5a3c3f1a55520_gr_session_id_sent_vst=8c622fb2-da5a-4918-ac21-8dc67f7aee66; __gads=ID=7c3097e7a1922a56:T=1705940724:RT=1705995061:S=ALNI_MYYle2RkDkZn4MSqKOxcoBSJHyC0Q; __gpi=UID=00000cedb40d0daa:T=1705940724:RT=1705995061:S=ALNI_MY7V04YB7kbApoQOu9Fbhi-92t1hg; _dd_s=rum=0&expire=1705996094247; _gat=1; __stripe_mid=c811b025-bf4b-4d5f-9938-a1a43836f0b98f5dda; __stripe_sid=a973374c-1d35-4dc9-b892-358953c475fe299e23; 87b5a3c3f1a55520_gr_cs1=squat_er; _ga=GA1.1.138240765.1705940301; _ga_CDRWKZTDEX=GS1.1.1705995060.2.1.1705995216.38.0.0",
            "Referer":"https://leetcode.com/problemset/",
            "X-Csrftoken": "7TGzKBtSAotrImEG7j0jtjM2W9BSlvSkp1nbx7pmSTe7o5kcx5kCo4qWVvz5KZrL"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json()).catch(err=>console.log("ERROR:",err))

    console.log(response)
    
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
        let remo = cppCode.replace(/\\n/g, "").replace(/\\/g, "")
        let submitStatus = await submitSolution(remo,questionID,titleSlug)
        console.log(submitStatus)
    }

}

main()



