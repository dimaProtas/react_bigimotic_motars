import ProfileReducer, {addPostActionCreated, deletePost} from './profile-reduser.js';


let state = {
    post: [
    { id: 1, name: 'Dima', message: "Hy, how are you?", likeCount: 14 },
    { id: 2, name: 'Dima', message: "I not Bot!", likeCount: 76 },
    { id: 3, name: 'Dima', message: "My first post", likeCount: '6k' },
]};


test('lengh of post should be incremented', () => {
    let action = addPostActionCreated("test profile reduser")
    let newState = ProfileReducer(state, action)
    expect(newState.post.length).toBe(4);
  });


//   test('message of post should be incremented', () => {
//     let action = addPostActionCreated("test profile reduser")
//     let newState = ProfileReducer(state, action)
//     expect(newState.post[3].message).toBe("test profile reduser");
//   });


  test('delete post', () => {
    let action = deletePost(1)
    let newState = ProfileReducer(state, action)
    expect(newState.post.length).toBe(2);
  });


  test('delete post 1000', () => {
    let action = deletePost(1000)
    let newState = ProfileReducer(state, action)
    expect(newState.post.length).toBe(3);
  });

