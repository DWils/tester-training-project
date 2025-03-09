
import './App.css'
import {Field, Form, Formik} from "formik";
import apiBackend from "./api/apiBackend.js";
import {useEffect, useState} from "react";

function App() {
    const [test,setTest] = useState('')

    const onSubmit = (values) => {
        console.log(values)
        apiBackend.post("/test",values).then(response => {
            console.log(response.data)
            setTest(response.data)
        })
    }

    useEffect(() => {
        apiBackend.get("/test").then(response => {
            console.log(response);

        })
        apiBackend.get("/api/products").then(response => {
            console.log("products", response);

        })
    }, []);



  return (
    <>
        <h1> Test</h1>
      <Formik initialValues={
          {
              test:''
          }
      } onSubmit={onSubmit}>
          <Form>
              <Field placeholder="test" name="test"/>
                <br/>
              <button type="submit">Envoyer</button>

          </Form>
      </Formik>

        <br/>
        <br/>
        <div>post : {test.test}</div>
    </>
  )
}

export default App
