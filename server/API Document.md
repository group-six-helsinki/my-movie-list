# API Document

## Register User

Make a new user

- #### Url

  `/register`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Request

  ```javascript
  body: {
  	email : req.body.email,
  	password : req.body.password
  }
  ```

- #### Succes Response

  ##### `code: 201`

  ```javascript
  json({
  	id: user.id,
    email: user.email,
    message: "Sukses create account",
  })
  ```

- #### Error Response

  ##### `code: 500`

  ```javascript
  json({
    msg: "Please enter a valid email address"||"Please enter a 6 characters password"
  });
  ```





## Login User

Login a user to aplication

- #### Url

  `/login`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Request

  ```javascript
  body: {
  	email : req.body.email,
  	password : req.body.password
  }
  ```

- #### Succes Response

  `Get an access token`

  ##### `code: 200`

  ```javascript
  json({
    access_token,
  });
  ```

- #### Error Response

  ```javascript
  if user not found => {
    message: "Wrong password or email",
    status: 401,
    name: "LoginError",
  }
  if password wrong => {
    message: "Wrong password or email",
    status: 401,
    name: "LoginError",
  }
  if server error => {
    status: 500
    msg: 'Internal server error'
    name: 'ServerError'
  }
  ```



## Login User With GAuth

Login a user to aplication

- #### Url

  `/loginGoogle`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Request

  ```javascript
  client = new OAuth2Client(process.env.GOOGLE_KEY)
  data:{
    email: payload.email
  }
  password: process.env.PASSWORD_RANDOM
  ```

- #### Succes Response

  `Get an access token`

  ##### `code: 200`

  ```javascript
  json({
    access_token,
  });
  ```

- #### Error Response

  ```javascript
  if user not found => {
    message: "Wrong password or email",
    status: 401,
    name: "LoginError",
  }
  if password wrong => {
    message: "Wrong password or email",
    status: 401,
    name: "LoginError",
  }
  if server error => {
    status: 500
    msg: 'Internal server error'
    name: 'ServerError'
  }
  ```

## 

## Show All Movie User

Showing all ToDo from database

- #### Url

  `/movies`

- #### Method

  `GET`

- #### Url Params

  ##### Required: `none`

- #### Data Request

  ```javascript
  None;
  ```

- #### Succes Response

  `Get all movies from database for user`

  ##### `code: 200`

  ```javascript
  json({
    data all movies
  })
  ```

- #### Error Response

  ```javascript
  if data not found =>{
    message: "Data not found", status: 404
  }
  if server error => {
    status: 500
    msg: 'Internal server error'
  }
  ```





## Create Movie

Make a watching list movie

- #### Url

  `/movies/movie`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Request

  ```javascript
  title: req.body.title,
  status: req.body.status || false,
  userID: req.decoded.id,
  ```

- #### Succes Response

  `Success create a list movie`

  ##### `code: 201`

  ```javascript
  json(
  movie(has been created)
  )
  ```

- #### Error Response

  ```javascript
  if Validation Error => {
    notEmpty(title) =>{
      msg: "Please enter typedata boolean"
  	}
    isIn(status)=>{
       msg: "Please enter typedata boolean"
    }
    code/status: 400
  }
  if server error => {
    msg: 'Internal server error'
  	code/status: 500
  }
  ```





## Create Anime

Make a watching list movie

- #### Url

  `/movies/anime`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Request

  ```javascript
  title: req.body.title,
  status: req.body.status || false,
  userID: req.decoded.id,
  ```

- #### 3rd API

  ```javascript
  API_type: jikan
  base_url: "https://api.jikan.moe/v3"
  method: 'GET'
  url: '/search/anime?q=(title)&limit=1'
  
  response =>{
    title,
    sinopsis,
    rating,
    poster_path,
  	release_year
  }
  
  ```

  

- #### Succes Response

  `Success create a list movie`

  ##### `code: 201`

  ```javascript
  json(
  movie(has been created)
  )
  ```

- #### Error Response

  ```javascript
  if Validation Error => {
    notEmpty(title) =>{
      msg: "Please enter typedata boolean"
  	}
    isIn(status)=>{
       msg: "Please enter typedata boolean"
    }
    code/status: 400
  }
  if server error => {
    msg: 'Internal server error'
  	code/status: 500
  }
  ```





## Update Status Movie/Anime By Id

- #### Url

  `/movies/:id`

- #### Method

  `PATCH`

- #### Url Params

  ##### Required: `id:[INTEGER]`

- #### Data Request

  ```javascript
  {
    id: req.params.id AS Integer
  }
  ```

- #### Succes Response

  `Updated a status ToDo By Id`

  ##### `code: 200`

  ```javascript
  json({
    data of updated movie
  })
  ```

- #### Error Response

  ```javascript
  if todo not found => {
    msg: 'Data not Found'
  	code/status: 404
  }
  if Validation Error => {
    notEmpty(title) =>{
      msg: "Please enter typedata boolean"
  	}
    isIn(status)=>{
       msg: "Please enter typedata boolean"
    }
    code/status: 400
  }
  if server error => {
    msg: 'Internal server Error'
  	code/status: 500
  }
  ```





## Delete a Movie/Anime By Id

- #### Url

  `/movie/:id`

- #### Method

  `DELETE`

- #### Url Params

  ##### Required: `id:[INTEGER]`

- #### Data Request

  ```javascript
  {
    id: req.params.id AS Integer
  }
  ```

- #### Succes Response

  `Delete a ToDo from database`

  ##### `code: 200`

  ```javascript
  msg: "todo success to delete";
  ```

- #### Error Response

  ```javascript
  if todo not found => {
    msg: 'Data not Found'
  	code/status: 404
  }
  if server error => {
    msg: 'Internal server error'
  	code/status: 500
  }
  ```