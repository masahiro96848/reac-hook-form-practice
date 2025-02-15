import './App.css'
import { useForm } from 'react-hook-form'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' })

  const onSubmit = (data) => console.log(data)

  const watchShowAge = watch('showAge', false)

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register('email', { required: '入力が必須の項目です' })}
          />
          {errors.email?.message && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register('password', {
              required: { value: true, message: '入力が必須の項目です。' },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'アルファベットのみ入力してください。',
              },
              minLength: { value: 8, message: '8文字以上入力してください' },
            })}
            type="password"
          />
          {errors.password?.types?.required && (
            <div>{errors.password.types.required}</div>
          )}
          {errors.password?.types?.pattern && (
            <div>{errors.password.types.pattern}</div>
          )}
          {errors.password?.types?.minLength && (
            <div>8文字以上入力してください。</div>
          )}
        </div>
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            {...register('confirmPassword', {
              validate: (val) => {
                if (!val) {
                  return '入力が必須の項目です'
                } else if (watch('password') !== val) {
                  return 'パスワードが一致していません'
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <div>{errors.confirmPassword.message}</div>
          )}
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}

export default App
