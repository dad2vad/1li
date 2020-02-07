
import { useState } from 'react';
import 'bulma/css/bulma.min.css';
import Layout from '../components/MyLayout'
const Home = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    url: '',
    honeypot: '', // if any value received in this field, form submission will be ignored.
    message: '',
    replyTo: '@', // this will set replyTo of email to email address entered in the form
    tce: '' 
  });

  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const TO = () => {
    
    const res = fetch('https://api.telegram.org/bot695543276:AAHqIsFuK-hzCor9q3nO2WgVlV6UfRFRE7c/sendMessage?chat_id=986940575&text=' + JSON.stringify(contact, null,4), {
      method: 'POST'
    })
    const json = res.json()
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
TO(
      if (json.success) {
        setResponse({
          type: 'success',
          message: 'ПАСИБА ТАДА'
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: JSON.stringify(e)
      });
    }
  };
  return (

    <div>
      <div className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column' />
            <div className='column  is-two-thirds'>
              <div
                className={
                  response.type === 'success'
                    ? 'tile box notification is-primary'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={
                  response.type === 'error'
                    ? 'tile box notification is-danger'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={response.message !== '' ? 'is-hidden' : 'columns'}
              >
                <div className='column content'>
                  <h2>ЗАЯВКА</h2>
                  <form
                    action='https://api.staticforms.xyz/submit'
                    method='post'
                    onSubmit={handleSubmit}
                  >
                    <div className='field'>
                      <label className='label'>ШО</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='text'
                          placeholder='шо'
                          name='name'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>ХТО</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='image'
                          placeholder='pic'
                          name='image'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>URL</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='url'
                          placeholder='url'
                          name='url'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field' style={{ display: 'none' }}>
                      <label className='label'>Title</label>
                      <div className='control'>
                        <input
                          type='text'
                          name='honeypot'
                          style={{ display: 'none' }}
                          onChange={handleChange}
                        />
                        <input
                          type='hidden'
                          name='subject'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>ПРО</label>
                      <div className='control'>
                        <textarea
                          className='textarea'
                          placeholder='про'
                          name='message'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>ЦЕ</label>
                      <div className='control'>
                        <textarea
                          className='textarea'
                          placeholder='це'
                          name='tce'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field is-grouped'>
                      <div className='control'>
                        <button className='button is-primary' type='submit'>
                          ok
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='column' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

