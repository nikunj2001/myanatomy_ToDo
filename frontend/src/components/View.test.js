import React from "react";
import ViewTask from "./ViewTask";
import {render} from "@testing-library/react";

describe("Status Data",()=>{
    it("status should be passed as props",()=>{
       render(<ViewTask/>  ) 
    })
})