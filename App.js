import React, { Component } from 'react';
import { Text, View,Image, StyleSheet,TextInput, 
  Button, SectionList, ActivityIndicator, FlatList } from 'react-native';

class Blink extends Component{

  toBlink(){
  setInterval(() => {
    this.setState(previousState => (
      {isShowing : !previousState.isShowing}
    ))
  }, 1000);
}
  state = { isShowing: true};

  render(){
    if(!this.state.isShowing){
      return null;
    }
    return(
      <Text style = {style.blue}>{this.props.text}</Text>
    );
  }

}
//Added props
class Mobile extends Component{
  render() {
    return(
      <View
        style={{alignItems: 'center',marginStart:20}}>
        <Text style = {style.red}> Team {this.props.name} </Text>
      </View>
    )
  }
}

const style = StyleSheet.create(
  {
    blue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 18
    },
    red:{
      color: 'red'
    },
    button:{
          margin:20
    },
   headerSection:{
       paddingTop:2,
       paddingLeft:10,
       paddingRight:10,
       paddingBottom:2,
       fontWeight:'bold',
   },
   itemSection:{
     padding:10,
     fontSize:16,
     height:44
   }

  }
)

class FetchMovies extends Component{
      constructor(props){
        super(props)
        this.state = { isLoading:true}
      }

      componentDidMount(){
         return fetch('https://reactnative.dev/movies.json')
                .then((response)=> response.json())
                .then((responseJson)=>{
                  this.setState({
                    isLoading:false,
                    dataSourc:responseJson.movies,
                  },function(){});
                })
                .catch((error)=>{
                  console.error(error);
                });
      }

      render(){
         if(this.state.isLoading){
           return(
             <View style={{flex:1,padding:20}}>
               <ActivityIndicator/>
             </View>
           )
         }

         return(
           <View style= {{flex:1,paddingTop:20}}>
           <FlatList
           data = {this.state.dataSourc}
           renderItem = {({item}) => 
         <Text>{item.title},{item.releaseYear}</Text>
         }
         keyExtractor={({id},index) => id}/>
           </View>
         );

      }
}

class DisplayList extends Component{
  render(){
    return(
      <View>
        <SectionList
        sections={[{title:'A',data:['Ajay Jadeja','Azhar','Akram']},
          {title:'B',data:['Bumrah','Bhuwneshwar']}]}
      
        renderItem={({itemSection})=><Text style={style.itemSection}>
          {itemSection}
          </Text>}
          renderHeader= {({headerSection})=><Text style={style.headerSection}>
            {sections.title}
            </Text>}
            keyExtractor = {(itemSection,index)=>index}
            />
      </View>
    );
  }
}

class BasicDimensions extends Component{
  render(){
    return(
      <View>
        <View style = {{width:100,height:30,backgroundColor
         : 'white'}}></View>
      </View>
    )
  }
}

export default class PayodaSample extends Component {
 constructor(props){
   super(props)
   this.state = {text:''}
 }

 onButtonPressed(){
   alert("Data submitted successfully!")
 }
 
  render() {
    let pic = {uri: "https://www.gstatic.com/webp/gallery/1.jpg"}
    return (
      <View style={{ flex: 1,flexDirection: 'column',
       alignItems:'flex-start' }}>
        <Blink text = "Welcome to Payoda React Native Sample App"></Blink>
       <BasicDimensions/>
        <Image source = {pic} style= {{width: 100, height: 100,alignSelf:'center'}}>
        </Image>
        <BasicDimensions/>
        <Mobile name = "Android"></Mobile>
        <Mobile name = "iOS"></Mobile>
        <Mobile name = "Nokia"></Mobile>
        <Mobile name = "Windows"></Mobile>
        <TextInput
         style ={{marginStart:20,height:50,
          marginTop:20,width:250}}
         placeholder = "Enter text here"
         onChangeText = {(text)=>this.setState({text})}
         value={this.state.text}
        />
        <Text
        style={{marginStart:20,padding:10,fontSize :20}} >
          {this.state.text}
        </Text>
        <Button
        style={style.button}
        onPress = {this.onButtonPressed}
        title="Submit"
        color= "#841841"
        />
        <DisplayList></DisplayList>
        <FetchMovies></FetchMovies>
      </View>
    );
  }
}
