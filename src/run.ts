import { FormulaEngine, ReferenceResolver, ReferenceResolverAsync} from "../src/index";


const formula1 = "TO_STRING(POW(2, {a}) + 10)"
const formula = "TO_STRING(" +
                            "IF(({b} == 10), POW(2, {b}), POW(1, {b}))" +
                        ")"
const formula2 = "TO_STRING( IF( ({riv1_length} > 4), CONCAT(SUBSTRING({riv1}, 0, 6), {riv2}), CONCAT({riv1}, {riv2})))"

let x = 1;
let y = 2;
let yes = "yes";
let no = "no";
let riv1 = "Arkiv Samling"
let riv2 = "1902-1905"


function resolveReferences(names: string[]): Record<string, any> {
    // your implementation to resolve variables
    return {
        a: 1 > 2,
        b: 20,
        riv1: riv1,
        riv2: riv2,
        riv1_length: riv1.length,
        riv2_length: riv2.length,
    };
}

const functions = {
    // your custom functions
    TO_STRING(val) {
        return String(val);
    },
    POW(x, a) {
        return Math.pow(x, a);
    },
    IS_TRUE(val) {
        return val === true;
    },
    IF(condition, doTrue, doFalse) {

        if (condition === true){
            return doTrue;
        }
        else{
            return doFalse;
        }
    },
    SUBSTRING(orgStirng, startIndex, endIndex) {
        return orgStirng.substring(startIndex, endIndex);
    },
    CONCAT(orgString, newString) {
        return orgString + newString;
    },
    TRIM(string){
        return string.trim();
    },
    REPLACE(orgString, toBeReplaced, toReplace) {
        return orgString.replace(toBeReplaced, toReplace);
    },
    REGEX_REPLACE(orgString, regExPattern, toReplace) {
        return orgString.replace(regExPattern, toReplace);
    },
    REGEX_MATCH(string, pattern) {
        return string.match(pattern);
    }

};

const engine = new FormulaEngine(resolveReferences, functions);
let result = engine.exec(formula2);
console.log(`the answer is: ${result}`);
