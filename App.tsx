import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState}from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
const PasswordSchema=Yup.object().shape({
  PasswordLength:Yup.number()
  .min(6,'Contain atleast 6 Characters')
  .max(12,'Maximum 12 Characters')
  .required('Length is required')
})
export default function App() {
  const[password, setPassword]=useState('')
  const[isPassGenerated, setisPassGenerated]=useState(false)
  const[uperCase, setuperCase]=useState(false)
  const[lowerCase, setlowerCase]=useState(true)
  const [numbers,setNumbers]=useState(false)
  const [symbols,setSymbols]=useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList =''
    const upperCaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const loweCaseChars='abcdefghijklmnopqrstuvwxyz';
    const digitChars='0123456789';
    const specialChars='!@#$%^&*()_+';

    if(uperCase){
      characterList+= uperCase
    }
    if(lowerCase){
      characterList+= lowerCase
    }
    if(numbers){
      characterList+= numbers
    }
    if (symbols) {
      characterList+= symbols
    }
    const passwordResult= createPassword(characterList,passwordLength)

    setPassword(passwordResult)
    setisPassGenerated(true)
  }
  const createPassword =(characters: string, passwordLength: number) => {
    let result=''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random()*characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
    console.log("nasir")
  }

  const reserPasswordState = () =>{
    setPassword('')
    setisPassGenerated(false)
    setlowerCase(true)
    setuperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength:'' }}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values)
        generatePasswordString(+values.passwordLength)
        
       }}
       
     >
       {({
         values,
         errors,
         touched,
         isValid,

         handleChange,
         handleBlur,
         handleSubmit,
         handleReset
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength &&(
              <Text style={styles.errorText}>{errors.passwordLength}
              </Text>
            )}
           

           
          </View>
          <TextInput style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='ex:8'
            keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include LowerCase</Text>
            <BouncyCheckbox
            useBuiltInState
            isChecked={lowerCase}
            onPress={() => setlowerCase(!lowerCase)}
            fillColor="#29AB87"
              />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include LowerCase</Text>
            <BouncyCheckbox
            useBuiltInState
            isChecked={lowerCase}
            onPress={() => setlowerCase(!lowerCase)}
            fillColor="#29AB87"
              />
         </View>
         <View style={styles.inputWrapper}></View>
         <View style={styles.inputWrapper}></View>

         <View style={styles.formActions}></View>
         <TouchableOpacity><Text>Generated Password</Text></TouchableOpacity>
         <TouchableOpacity><Text>Reset</Text></TouchableOpacity>
         </>
       )}
     </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },

})