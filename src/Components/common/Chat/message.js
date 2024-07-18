import {getCurrentTimeStamp} from "../../../Helpers/useMoment.jsx";

class TextMessage {
    constructor(text, by) {
        this.text = text;
        this.by = by;
        this.time = getCurrentTimeStamp("LLL"); // returns string, so this can be serialized to JSON
    }
}

export default TextMessage