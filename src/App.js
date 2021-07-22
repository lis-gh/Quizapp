import './App.css';
import React, {Component, createElement} from 'react';

class App extends Component {
  state={
    question:'',
    answers:[],
    ranswer:'',
    index:0,
    wrong:0,
    right:0
  }
  fetchdata =()=>{

    
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple').then(res=>
    {
      return res.json()
    }).then(
      data=>{
        if(this.state.index < data.results.length){
          this.state.answers.push(data.results[this.state.index].correct_answer);
        this.setState({
          question:data.results[this.state.index].question,
          ranswer:data.results[this.state.index].correct_answer,
          answers:[...data.results[this.state.index].incorrect_answers,data.results[this.state.index].correct_answer],
          index:this.state.index + 1
        })
        let arr=[];
        let i=0;
        while(i<4){
          let j=Math.floor((Math.random() * 4 ));
          if (!arr.includes(this.state.answers[j])) {
            
            arr.push(this.state.answers[j]);
            i++;
        }
        }
       
        this.setState({
          answers:arr
          //or we can do : answers:[...arr]
        }) 
      }else{
        this.finish();
      }
       //console.log(this.state.ranswer);
      }
    )
  }
  compare=()=>{
    let selected=document.getElementsByName('answer');
    let selectitem;
    
    for(let i = 0; i < selected.length; i++) {
      if(selected[i].checked){
        selectitem=selected[i].value;
        document.querySelector('.alert-danger').style.display='none';
        if(selectitem==this.state.ranswer)
          this.setState({
            right:this.state.right +1
           });
        else
          this.setState({
           wrong:this.state.wrong +1
            });
           selected[i].checked=false;
        this.fetchdata();
        
        break;
        
        
      }else if(selected[i].checked==false && i===3){
       document.querySelector('.alert-danger').style.display='block';
      }
      
    }
    console.log(selectitem);
  }

  start=()=>{
    document.querySelector('.startex').style.display='block';
    document.querySelector('.startexam').style.display='none';
    document.querySelector('.time').style.display= "block";
    this.fetchdata();
    this.timer(70);
  }

  list=()=>{
    return(
    this.state.answers.map(ele=>
      {
      return(
        <div className="form-check">
        <input className="form-check-input" type="radio" name="answer"  value={ele}/>
        <label className="form-check-label" >
        {ele}
        </label>
      </div>
      )}
      )
    )
  }

  timer=time=>{  
     let count= setInterval(()=>{
          time--;
           let min=Math.floor(time / 60);
           let sec=Math.floor(time % 60);
         // console.log(min+" : "+sec);
          document.querySelector('.time').innerHTML= `${min <10 && min>=0 ? `0`+min+` : ` :min + ` : `} 
                                                      ${ sec<10 && min>=0 ?`0`+sec :sec}`;
          if(time<0){
           
           clearInterval(count);
           this.finish();
            
          }
          
      },1000)
    
      //return(count);
  }
  finish=()=>{
    document.querySelector('.startex').innerHTML=`<h3 class="text-center p-3">Your Exam Result </h3>
        <p>Right answers: ${this.state.right}</p>
        <p>Wrong answers: ${this.state.wrong}</p>
        ${this.state.right===10 ?`<p>you have <span class="text-primary">Perfect</span> score</p> `
                      :`<p>you have <span class="text-primary">Bad</span> score</p>`}`;
    document.querySelector('.time').style.display= "none";

  }

  render(){
  return (
    <div className="container mt-5">
      <div className="row bg-light m-1 p-3 text-secondary">
        <div className="col">
          <span>The question number: </span><span>{this.state.index}  of 10</span>
        </div>
        <div className="col">
         <span>Wrong answers: {this.state.wrong}</span>
        </div> 
        <div className="col">
         <span>Right answers: {this.state.right}</span>
        </div> 

      </div>
      <div className=" bg-light p-5 mt-3 text-center startexam">
        <h3>To start the quiz click the button below</h3>
        <button className="btn btn-primary mt-5 w-25" onClick={this.start}>Start</button>

      </div>

      <div className=" bg-light p-5 mt-3 startex" style={{display:'none'}}>
        <h3>{this.state.question} </h3>
      {this.list()}

      <button className="btn btn-primary mt-5 w-25" onClick={this.compare}>submit</button>

      </div>
      <span className="float-right p-3 mt-3 text-white shadow rounded-circle time bg-primary" style={{display:"none"}}> </span>

      <div style={{display:'none'}}  className="alert alert-danger mt-5 w-75 font-weight-bold" role="alert">
        A simple danger alert—check it out!
      </div>
     
    </div>
  );
}
}

export default App;
