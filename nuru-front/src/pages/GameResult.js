import './GameResult.css'
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';

const GameResult = () => {
    const history = useHistory()
    const game_result = history.location.state.gameResult

    var success_count = 0;

    const result = [];
    for (let i = 0; i < game_result.length; i++){
        result.push(
            <>
            <div class = "result-div-sub">
                <span class = "result-head-text">게임{game_result[i].id+1} 결과: </span>
                <span class = "success-text">&nbsp;성공 {game_result[i].answer}</span>
                <span class = "median">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                <span class ="fail-text">문제 수 {game_result[i].origin}</span>
                <span class = "median">&nbsp;&nbsp;→</span> 
                {
                    (function(){
                        if(game_result[i].origin === game_result[i].answer){
                            success_count+=1;
                            return (<span class = "result-success">&nbsp;성공!</span>)
                        }
                        return (<span class = "result-fail">&nbsp;실패..</span>)
                    })()
                }
            </div>
            </>
        )
    }
    // console.log(result)
    // return result;


    return (
    <>
    <div class = "container">
        <div class = "result-div">
            <span class = "result-main-text">게임 결과</span>
            {result}
            <span class = "result-end-text">총 {game_result.length} 문제 중 {success_count}문제 성공!</span>
        </div>
    </div>


    <Link to="/">
            <button className="mainmenu">
              <span className="buttonText">메인 화면으로 돌아가기</span>
            </button>
    </Link>
    </>
    )
}

export default GameResult