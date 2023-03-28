// Axios Global Token
axios.defaults.headers.common['X-Auth-Token']= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
function getTodos() {

    // axios({
    //     method:'get',
    //     url :'https://jsonplaceholder.typicode.com/posts',
    //     params :{
    //         _limit:5
    //     }
    // })
    // .then(data => showOutput(data))
    // .catch(err => console.log(err))

    axios('https://jsonplaceholder.typicode.com/posts?_limit=5')
     .then(data => showOutput(data))
     .catch(err => console.log(err))
  }
  
  // POST REQUEST
  function addTodo() {
    axios({
        method:'post',
        url:'https://jsonplaceholder.typicode.com/posts',
        data:{
            title: 'car',
            completed: false
        }

    })
    .then(data => showOutput(data))
     .catch(err => console.log(err))
    
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios(
        {
            method:'put',
            url:'https://jsonplaceholder.typicode.com/posts/1',
            data:{
                title:'updated car',
                completed: false
            }
        }
    )
    .then(data => showOutput(data))
    .catch(err => console.log(err))
  }
  
  
  // DELETE REQUEST
  function removeTodo() {
       axios
       .delete('https://jsonplaceholder.typicode.com/posts/1')
       .then(data => showOutput(data))
       .catch(err => console.log(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
   axios
   .all([ 
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://jsonplaceholder.typicode.com/todos')
   ])

   .then(data => {
    console.log(data[0])
    console.log(data[1])
    showOutput(data[0])})
   .catch(err => console.log(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    }
    axios({
        method:'post',
        url:'https://jsonplaceholder.typicode.com/todos',
        data:{
            title: 'car',
            completed: false
        }

    },config)
    .then(data => showOutput(data))
    .catch(err => console.log(err))

  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
   const options = {
    method : 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data:{
        title : 'title 1'
    },
    transformResponse : axios.defaults.transformResponse.concat(data =>{
       data.title=data.title.toUpperCase()
       return data
    }
  )
   }
   axios(options).then(res => showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios('https://jsonplaceholder.typicode.com/postss')
    .then(data => showOutput(data))
    .catch(err => {
      if(err.response){
        console.log(err.response.status)
        console.log(err.response.data)
        console.log(err.response.header)
        if(err.response.status == 404)
        alert('Error: Page Not Found')
      }
      else{
        console.error(err.message)
      }
    })
 }
  
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();
    axios('https://jsonplaceholder.typicode.com/posts',{
      cancelToken : source.token
    })
    .then(data => showOutput(data))
    .catch(thrown => {
      if(axios.isCancel(thrown)){
        console.log('Request cancel',thrown.message)
      }
      
    })
    if(true)
      source.cancel('Request Cancel')
 }

  
  
  // INTERCEPTING REQUESTS & RESPONSES
      axios.interceptors.request.use(config =>{
        console.log(`${config.method} request send to ${config.url} 
        at ${new Date().getTime()}`)
        return config
      })
  // AXIOS INSTANCES
  const axiosInstance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/posts'
  })
  axiosInstance.get('/comments').then(res => showOutput(res))
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);