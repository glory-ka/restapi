// CREATE SURVEY
const response = await fetch('http://10.12.108.1:3000/orangutan/survey/SimonServey/create', {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		ownerId: '123dgrtd',
		date_open: new Date('6/9/2022'),
		date_close: new Date('6/10/2022'),
		status: 'unpublished',
		question: {
			question: 'How old are you?',
			answer1: 'good',
			answer2: 'bad',
			answer3: 'neither'
		}
	})
  });
  
// RESPOND TO SURVEY
const response = await fetch('http://10.0.0.17:3000/orangutan/survey/JirayaServey/response', {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		userId: '53ifnow',
		response: 'answer1',
	})
  });

// OTHER RESPONSE TO SURVEY
const response = await fetch('http://10.12.108.1:3000/orangutan/survey/JirayaServey/otherResponse', {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		userId: '123abc',
		response: 'good',
	})
  });
  
// CHANGE SERVERY QUESTION
const response = await fetch('http://10.12.108.1:3000/orangutan/survey/GlodiServey/updateQuestion', {
    method: 'PUT',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		ownerId: '123abc',
		question: 'This is a new question'
	})
  });
  
// CHANGE SERVEY STATUS
const response = await fetch('http://10.12.108.1:3000/orangutan/survey/ErwinServey/updateStatus', {
    method: 'PUT',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		ownerId: '123abc',
		status: 'published'
	})
  });
  
// DELETE USER RESPONSE
const response = await fetch('http://10.0.0.17:3000/orangutan/survey/JirayaServey/delete', {
    method: 'DELETE',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		ownerId: '3455dds',
		firstname: 'Mathiew',
		lastname: 'Luther'
	})
  });
  
// DELETE USER SURVEY
const response = await fetch('http://10.0.0.17:3000/orangutan/survey/JirayaServey/deleteSurvey', {
    method: 'DELETE',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({
		ownerId: '3455dds'
	})
  });