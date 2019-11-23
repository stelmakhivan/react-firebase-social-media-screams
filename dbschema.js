const db = {
  users: [
    {
      userId: '5DJt1enbUGadQ3ANvv2oD7ZduOu2',
      email: 'user@gmail.com',
      handle: 'user',
      createdAt: '2019-09-28T13:21:54.561Z',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/social-media-screams.appspot.com/o/80984110197.jpg?alt=media',
      bio: 'Hello, my name is John Doe',
      website: 'https://john.doe.com',
      location: 'Lviv, UA'
    }
  ],
  screams: [
    {
      userHandle: 'user',
      userImage:
        'https://firebasestorage.googleapis.com/v0/b/social-media-screams.appspot.com/o/68644931927.jpg?alt=media',
      body: 'First Scream !!!',
      createdAt: '2019-09-28T13:09:45.853Z',
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 's72HlZoK1tXqyGjL5Dai',
      comment: 'First comment',
      createdAt: '2019-09-28T13:10:50.853Z'
    }
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: 'voNyMzKYZnkmkUDS4UPJ',
      type: 'like | comment',
      createdAt: '2019-09-28T13:16:05.853Z'
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: '5DJt1enbUGadQ3ANvv2oD7ZduOu2',
    email: 'user@gmail.com',
    handle: 'user',
    createdAt: '2019-09-28T13:21:54.561Z',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/social-media-screams.appspot.com/o/80984110197.jpg?alt=media',
    bio: 'Hello, my name is John Doe',
    website: 'https://john.doe.com',
    location: 'Lviv, UA'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 's72HlZoK1tXqyGjL5Dai'
    },
    {
      userHandle: 'user',
      screamId: 'voNyMzKYZnkmkUDS4UPJ'
    }
  ]
};
