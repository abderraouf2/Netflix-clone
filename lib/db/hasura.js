

export async function insertStats(token, {userId, videoId,favourited,watched}) {
  const operationsDoc = `
      mutation insert($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
        insert_stats(objects: 
          {
            favourited: $favourited, 
            userId: $userId,
            videoId: $videoId,
            watched: $watched
          }) {
            returning{favourited
            id
            userId}
        }
      }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "insert",
    { 
      userId,
      videoId,
      favourited,
      watched
    },
    token
  );
  console.log(response);
  return response ;
}

export async function updateStats(token, {userId, videoId,favourited,watched}) {
  const operationsDoc = `
    mutation update($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      update_stats(
        where: {
          userId: {_eq: $userId },
          videoId: {_eq: $videoId}, }
        _set: {watched: $watched, favourited: $favourited}) {
        returning {
          favourited
          id
          userId
          videoId
          watched
        }
      }
    }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "update",
    { 
      userId,
      videoId,
      favourited,
      watched
    },
    token
  );
  console.log(response);
  return response ;
}


export async function findVideoIdByUserId(token, userId, videoId){
  const operationsDoc = `
  query findVideo( $userId: String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId},videoId: {_eq: $videoId}}) {
      favourited
      userId
      videoId
      watched
    }
  }
`;
const response = await queryHasuraGQL(
  operationsDoc,
  "findVideo",
  { 
    userId,
    videoId,  
  },
  token
);
console.log(response);
return response?.data?.stats ;
}


export async function isNewUser (token,issuer) {
  const operationsDoc = `
  query isNewUser($issuer : String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    {issuer,},
    token
  );
  console.log(response, issuer);
  return response?.data?.users?.length === 0 ? true : false;
}

export async function createNewUser(token,metadata) {
  const operationsDoc = `
  mutation createUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

const { issuer, publicAddress, email } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createUser",
    {issuer,
    publicAddress,
    email
    },
    token
  );
  console.log(response, issuer);
  return response?.data?.users?.length === 0 ;
}

export async function queryHasuraGQL(operationsDoc, operationName, variables,token) {
  const result = await fetch( process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        Authorization : `Bearer ${token}`,
        "Content-type" : 'application/json'
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

export async function getWatchedVideos ( userId, token ) {

const operationsDoc = `
query watchedVideos( $userId: String! ) {
  stats(where: {
    userId: {_eq: $userId}, 
    watched: {_eq: true}
    }) {
    videoId
  }
}
`;
const response = await queryHasuraGQL(
  operationsDoc,
  "watchedVideos",
  {userId,},
  token
);
console.log( response );
return response?.data?.stats ;
}

export async function getLikedVideos ( userId, token ) {

  const operationsDoc = `
  query likedVideos( $userId: String! ) {
    stats(where: {
      userId: {_eq: $userId}, 
      watched: {_eq: true},
      favourited: {_eq: 1},
      }) {
      videoId
    }
  }
  `;
  const response = await queryHasuraGQL(
    operationsDoc,
    "likedVideos",
    {userId,},
    token
  );
  console.log( response );
  return response?.data?.stats ;
  }

 


