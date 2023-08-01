//react.js 파일에서 export한 객체를 React로 받아서 사용
//{이름} 의 경우는 export 한 객체에서 이름에 해당하는 것만 받아서 사용
import React from "react"
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";

//Icon 가져오기
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class ToDo extends React.Component{
    constructor(props){
        super(props); 
        //상위 컴포넌트로부터 넘겨받은 데이터를 나의 props에 저장
        //props는 읽기전용이라서, 수정할 경우 state에 복사하여 사용해야 함
        this.state = {item:props.item, readOnly:true}

        this.delete = props.delete //props로 상위 객체(delete)를 받아옴
        this.update = props.update;
    }
    
    //Event 가 발생시, readOnly의 값을 false로 수정
    offReadOnlyMode = (e) => {
        //state 의 값을 직접 변경
        this.setState({readOnly:false})
    }

    //Enter를 눌렀을 때 동작하는 메서드
    enterKeyEventHandler = (e) => {
        if(e.key === "Enter"){
            this.setState({readOnly:true});
            //데이터 수정
            this.update(this.state.item);
        }
    }

    //input의 내용을 변경했을 때 호출될 메서드
    editEvnetHandler = (e) =>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }

    //체크박스의 값을 변경할 때 호출될 메서드
    checkboxEventHandler = (e) =>{
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done
        this.setState({item:thisItem});
    }



    //삭제 icon 누를시 호출될 함수
    deleteHandler = (e) => {
        this.delete(this.state.item);
    }

    render(){
        const item = this.state.item;
        return(           
            
            <ListItem>
                <Checkbox checked={item.done} 
                onChange={this.checkboxEventHandler}/>

                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label":"naked",
                        readOnly:this.state.readOnly}}
                        type="text"
                        id={item.id}
                        name={item.name}
                        value={item.title} 
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEvnetHandler}/>

                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete ToDo"
                    onClick = {this.deleteHandler}>
                        <DeleteOutlined />
                        
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default ToDo;