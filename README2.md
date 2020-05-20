1 - when log in - auth-router, we genereate a token by using the library(createToken)
2- Once we have the token, we can send it to the client
3 - The client is responsible for grabbing the token from the response body and storing it (localStorage or other places)

On the following reguest - LOGIN
4 - The user-router is bringing in the restricted middleware
5 - The restricted-middleware runs before hitting any of the ENDPOINTS
6 - When the middleware executes before the endpoints, we go to the middleware and bring in the library
7 - We read the Authorization header in the middleware
8 - We ask the client that uses the API: For the authenticated route, you have to send a header called authorization with your token  
9 - If we do not have the token - we send a message back asking for the authentication information
10 - If we have the token, we have to make sure we are using the same secret that we used to produce the token
11 - We then call the verify medthod from the library and pass is the token,the secret and the 3rd function (error, decodedToken)
12 - The decodedToken will be stored as req.jwt if the token is valid
13 - Call next()
