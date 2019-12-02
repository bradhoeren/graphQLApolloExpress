# graphQLApolloExpress
Based on https://www.robinwieruch.de/graphql-apollo-server-tutorial

Having issues splitting Routes into subfolder /routes/ instead of just /src/index.js. It appears the models reference is not proper from /routes/ files.

Will review after hooking up PostGRES server.

curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'
