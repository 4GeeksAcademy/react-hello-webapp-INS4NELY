import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const UpdateUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const user = async () => {
            try {
                const response = await fetch(
                    `https://playground.4geeks.com/contact/agendas/nomastrabajos/contacts/`
                  );
            const data = await response.json()
            const contacto = data.contacts.find(user => user.id === Number(id));
            setName(contacto.name);
            setEmail(contacto.email);
            setPhone(contacto.phone);
            setAddress(contacto.address);
            } catch (error) {
                console.log(error);
            } finally {
              setLoading(false);
            }
        }
        user()
    },[id])
    
  const buildContact = async (e) => {
    e.preventDefault();
    
    if (name !== '' && email !== '' && phone !== '' && address !== '') {
      try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/nomastrabajos/contacts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
          })
        })
        
        if (response.status === 200) {
          setName('')
          setEmail('')
          setPhone('')
          setAddress('')
          navigate('/')
          return
        }

      } catch (error) {
        console.log('No task', error);

      }
    }
  }
  if (loading) {
    return(
    <div class="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
   </div>
   )
  }

  return (
    <div className="mx-5">
      <div className="text-center mt-5 ">
        <h1>Update contact </h1>
      </div>
      <form onSubmit={buildContact} className="d-flex flex-column gap-4 mt-5">
        <div>
          <div className="d-flex">
            <label>Full Name</label>
            <p className=" ms-3 text-secondary textSize">*Minimo 3 letras</p>
          </div>
          <input type="text" name="" id=""  pattern="[A-Za-z ]{3,}" className="form-control" value={name} minLength={3} onChange={(e) => {setName(e.target.value)}} required/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="" id="" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
        </div>
        <div>
          <label>Phone</label>
          <input type="number" name="" id="" className="form-control" value={phone}  pattern="[0-9]{9,}" minLength={9} maxLength={15} onChange={(e) => {setPhone(e.target.value)}} required/>
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="" id=""  className="form-control" minLength={3} value={address} onChange={(e) => {setAddress(e.target.value)}} required/>
        </div>
        <button type="submit" className="btn btn-primary w-100">Save</button>
      </form>
      <Link to="/">
        Or get back to contacts
      </Link>
    </div>
  );
}