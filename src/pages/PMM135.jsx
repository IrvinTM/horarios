import { Schedule } from "../components/Schedule"
import {subjects} from "../curatedJson.json"
export function PMM135(){
    return(
        <div className="text-center flex flex-col justify-center content-center items-center">
            <Schedule subject={subjects[4]}></Schedule>
        </div>
    )
}