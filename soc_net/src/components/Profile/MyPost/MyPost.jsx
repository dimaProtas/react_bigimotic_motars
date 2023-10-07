import React, { useRef, useEffect, createRef, useState } from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import { TiImage } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";


const SignupSchema = Yup.object().shape({
  textarea: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});



const MyPost = React.memo((props) => {
  const { getPost, userId } = props;

  useEffect(() => {
    getPost(userId);
  }, [getPost, userId]);

  // Делает проверку на входящие пропсы, и не позволяет КЛАССОВОЙ компоненте рендарится повторно без новых пропсов.
  //Закоментил, потому что эту функцию теперь выполняет PureComponent (class MyPost extends PureComponent {})
  //В функциональной компоненте эту функцию выполняет React.memo
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps !== this.props || nextState !== this.state;
  // }



  //Закоментил, потому что этим теперь занимается Formik, и он использует локальный state
  // const newPostElement = React.createRef();

  // const onAddPost = () => { 
  //   // const text = newPostElement.current.value;
  //   props.addPost();
  //   // props.updateTextPost('');  // Обнуляет строку ввода
  // }

  // const onPostChange = () => {
  //   const text = newPostElement.current.value;
  //   props.updatePostActionCreated(text);
  // }
  return (
    <div>
      {/* <div className={s.posts}>
          My post
          <div>
            <textarea onChange={ onPostChange } value={props.newText } ref={ newPostElement } className={s.input_post} placeholder='your news...'></textarea>
          </div>
          <div>
            <button onClick={ onAddPost }>Send</button>
          </div>
        </div> */}
      <div className={s.posts}>
        <PostForm addPost={props.addPost} onPostChange={props.updatePostActionCreated} userId={props.userId} authorizedUserId={props.authorizedUserId} />
      </div>
      {/* {[...props.post].reverse().map(p => <Post name={p.author} key={p.id} message={p.message} likeCount={p.likeCount} />)} */}
      {props.post && props.post.slice().reverse().map(post => {
  // Фильтрация комментариев для текущего поста
      const commentsForPost = props.comments.filter(comment => comment.post === post.id);
      
      return (
        <Post
          key={post.id}
          name={post.author.name}
          authorId={post.author.id}
          message={post.message}
          likeCount={post.like_count}
          img={post.author.photos.large}
          createdAt={post.created_at}
          authorizedUserId={props.authorizedUserId} 
          postId={post.id}
          postDelete={props.postDelete}
          isLiked={post.isLiked}
          like={props.like}
          likeRemove={props.likeRemove}
          photo_post={post.photo_post_url}
          comments={commentsForPost} // Передаем отфильтрованные комментарии
          postComment={props.postComment}
          deleteComment={props.deleteComment}
        />
      );
    })}
    </div>
)
})




export const PostForm = (props) => {

  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Добавьте эту строку


  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadedFile(file); // Сохраняем файл в состоянии
    }
  }

  const handleRemovePhoto = () => {
    setSelectedImage(null);
    setUploadedFile(null);
  };

  const formRef = useRef(null);
  const ref = createRef();
  return (
    <Formik
      initialValues={{ textarea: "" }}
      onSubmit={async (values, { setValues }) => {
        const author = props.authorizedUserId; // Получаем ID автора из пропсов
        const userId = props.userId ? props.userId : props.authorizedUserId; // Получаем ID пользователя из пропсов
        const message = values.textarea; // Получаем текст поста из формы
        try {
          await props.addPost(author, message, parseInt(userId, 10), uploadedFile);
          setSelectedImage(null);
          setUploadedFile(null); // Сбрасываем состояние файла
          setValues({ textarea: '' }); // Сброс значений поля textarea
          if (formRef.current) {
            formRef.current.resetForm(); // Используем метод resetForm()
            formRef.current.blur();
          }
        } catch (error) {
          // Обработка ошибок
        };
      }}
      validationSchema={SignupSchema}
      innerRef={formRef} // Прокидываем ссылку на форму
    >
      {({ errors, touched }) => (
        <Form>

          <div className={errors.textarea && touched.textarea ? s.errors : null}>
            <Field placeholder='post...' name='textarea' type='textarea' />
            <div className={s.imagePreviewContainer}>
              <div className={s.imagePreview}>
                {selectedImage && (
                  <img src={selectedImage} alt="preview" className={s.centeredImage} />
                )}
                {selectedImage && (
                  <AiOutlineCloseCircle className={s.closeIcon} onClick={handleRemovePhoto} />
                )}
              </div>
            </div>
          </div>

          {errors.textarea && touched.textarea ? (
            <div className={s.errors}>
              {errors.textarea}
            </div>
          ) : null}
          
          <div>
            
            <button type="submit">Send</button>
            <span className={s.addImg} onClick={() => ref.current?.click()}><TiImage /></span>
          <input type='file' ref={ref} onChange={onMainPhotoSelected} style={{ display: "none" }} />
            
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default MyPost