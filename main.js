
const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const desc = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");

const addBTn = document.querySelector("#click");
const deleteBtn = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");

let arr = [];

if(localStorage.getItem("courses") != null) {
    console.log("displa3232y");

    arr = JSON.parse(localStorage.getItem("courses"));
    displayC();
}

addBTn.addEventListener("click",(e)=>{
    e.preventDefault();

    const pattern = /^[A-Z][a-z]{2,10}$/
    const pattern2 = /^[A-Z][a-z]{2,20}$/
    const patternNumber = /^(1000|[1-9][0-9]{2})$/;
    const pattern3 = /^[A-Z][a-z\s]{9,49}$/
    const pattern4 = /^(2[0-9]|3[0-9]|40)$/;
    if(!pattern.test(name.value)){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Course name should start with uppercase and have length between 3 and 10'
        })
        document.querySelector(".forN").innerHTML = `Course name should start with uppercase and have length between 3 and 10`;
        document.querySelector(".forN").classList.add("error", "text-danger");
    }
    else{
        document.querySelector(".forN").innerHTML = ``;
    }
    if(!pattern2.test(category.value)){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Course category should start with uppercase and have length between 2 and 20'
        });
        document.querySelector(".forCategory").innerHTML = `Course category should start with uppercase and have length between 2 and 20`;
        document.querySelector(".forCategory").classList.add("error", "text-danger");
    }
    else{
        document.querySelector(".forCategory").innerHTML = ``;
    }
    if(!patternNumber.test(price.value)){
        document.querySelector(".forP").innerHTML = `Course prcie should be between 100 and 1000`;
        document.querySelector(".forP").classList.add("error", "text-danger");
    }
    else{
        document.querySelector(".forP").innerHTML = ``;
    }
    if(!pattern3.test(desc.value)){
        document.querySelector(".forDesc").innerHTML = `Course description should have length between 10 and 50 and start with uppercase`;
        document.querySelector(".forDesc").classList.add("error", "text-danger");
    }
    else{
        document.querySelector(".forDesc").innerHTML = ``;
    }
    if(!pattern4.test(capacity.value)){
        document.querySelector(".forCap").innerHTML = `course capacity should have length between 20 - 40`;
        document.querySelector(".forCap").classList.add("error", "text-danger");
    }
    else{
        document.querySelector(".forCap").innerHTML = ``;
    }
     if(patternNumber.test(price.value)&&pattern2.test(category.value)&&pattern.test(name.value)&&pattern3.test(desc.value)){
        const course = { //object ***
            name: name.value,
            category: category.value,
            price: price.value,
            description: desc.value,
            capacity: capacity.value
        }
        document.querySelector(".forN").innerHTML = ``;
        document.querySelector(".forCategory").innerHTML = ``;
        document.querySelector(".forP").innerHTML = ``;

        let flag = true;
        for(let i = 0; i < arr.length; i++) {
            if( arr[i].name === course.name){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "course updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                arr[i] = course;
                flag = false;
            }
        }
        if(flag)
            arr.push(course); // add object to array
        
    
        localStorage.setItem("courses", JSON.stringify(arr)); //it must be string ********************************
    
        if(flag){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
        }
        displayC();
    }

   
})


function displayC(){
    console.log("display");
    const result = arr.map((course,index)=>{
        return `
        <tr>
            <td>${index}</td>
            <td>${course.name}</td>
            <td>${course.category}</td>
            <td>${course.price}</td>
            <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
            <button onclick="deleteCourse(${index})" class="btn btn-danger">Delete</button>
            </td>


        </tr>`;
    }).join("");

    document.querySelector("#data").innerHTML = result;
}

//this is how the json looks like

/*[
{
"name":"ad",
"category":"wewe",
"price":"323",
"description":"adwd",
"capacity":"13"
}
]*/

function deleteCourse(index){
    console.log(index);
    arr.splice(index,1);
    localStorage.setItem("courses", JSON.stringify(arr));
    displayC();
}

deleteBtn.addEventListener("click", () =>{
    arr = [];
    localStorage.setItem("courses", JSON.stringify(arr));
    displayC();
});

search.addEventListener("input", (e)=>{
   const keyword = search.value;
   //let searchResult = []
   const Courseresult = arr.filter((course)=>{
    return course.name.toLowerCase().includes(keyword.toLowerCase()); // to lower case function *********
   });
  
    const result =  Courseresult.map((course,index)=>{
        return `
        <tr>
            <td>${index}</td>
            <td>${course.name}</td>
            <td>${course.category}</td>
            <td>${course.price}</td>
            <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
            <button onclick="deleteCourse(${index})" class="btn btn-danger">Delete</button>
            </td>


        </tr>`;
    }).join("");

    document.querySelector("#data").innerHTML = result;
});