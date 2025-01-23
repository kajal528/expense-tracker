import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const categories = [
  {
    "category_id": 1,
    "category": "Housing"
  },
  {
    "category_id": 2,
    "category": "Transportation"
  },
  {
    "category_id": 3,
    "category": "Food"
  },
  {
    "category_id": 4,
    "category": "Utilities"
  },
  {
    "category_id": 5,
    "category": "Insurance"
  },
  {
    "category_id": 6,
    "category": "Healthcare"
  },
  {
    "category_id": 7,
    "category": "Entertainment"
  },
  {
    "category_id": 8,
    "category": "Education"
  },
  {
    "category_id": 9,
    "category": "Personal Care"
  },
  {
    "category_id": 10,
    "category": "Savings"
  },
  {
    "category_id": 11,
    "category": "Debt Repayment"
  },
  {
    "category_id": 12,
    "category": "Travel"
  },
  {
    "category_id": 13,
    "category": "Gifts"
  },
  {
    "category_id": 14,
    "category": "Charity"
  },
  {
    "category_id": 15,
    "category": "Miscellaneous"
  }
]

const expensesList = [
  {
    "id": 1,
    "category": "Housing",
    "amount": 1200,
    "description": "Monthly rent payment",
    "date": "2025-01-01"
  },
  {
    "id": 2,
    "category": "Transportation",
    "amount": 150,
    "description": "Monthly subway pass",
    "date": "2025-01-03"
  },
  {
    "id": 3,
    "category": "Food",
    "amount": 300,
    "description": "Groceries and dining out",
    "date": "2025-01-05"
  },
  {
    "id": 4,
    "category": "Utilities",
    "amount": 200,
    "description": "Electricity, phone, and internet",
    "date": "2025-01-06"
  },
  {
    "id": 5,
    "category": "Insurance",
    "amount": 100,
    "description": "Health and car insurance premiums",
    "date": "2025-01-07"
  },
  {
    "id": 6,
    "category": "Healthcare",
    "amount": 50,
    "description": "Medical expenses, doctor visit",
    "date": "2025-01-08"
  },
  {
    "id": 7,
    "category": "Entertainment",
    "amount": 80,
    "description": "Movie tickets and streaming subscription",
    "date": "2025-01-10"
  },
  {
    "id": 8,
    "category": "Education",
    "amount": 200,
    "description": "Tuition and books for course",
    "date": "2025-01-11"
  },
  {
    "id": 9,
    "category": "Personal Care",
    "amount": 60,
    "description": "Toiletries and grooming products",
    "date": "2025-01-12"
  },
  {
    "id": 10,
    "category": "Savings",
    "amount": 500,
    "description": "Monthly savings for emergency fund",
    "date": "2025-01-15"
  },
  {
    "id": 11,
    "category": "Debt Repayment",
    "amount": 250,
    "description": "Credit card payment",
    "date": "2025-01-17"
  },
  {
    "id": 12,
    "category": "Travel",
    "amount": 600,
    "description": "Flight and hotel booking for vacation",
    "date": "2025-01-18"
  },
  {
    "id": 13,
    "category": "Gifts",
    "amount": 100,
    "description": "Birthday presents",
    "date": "2025-01-19"
  },
  {
    "id": 14,
    "category": "Charity",
    "amount": 50,
    "description": "Donation to charity",
    "date": "2025-01-20"
  },
  {
    "id": 15,
    "category": "Miscellaneous",
    "amount": 30,
    "description": "Unexpected small expenses",
    "date": "2025-01-21"
  }
]

function App() {
  const expensesListModified = expensesList.map((expense)=>{return {...expense, amount:Math.ceil(expense.amount)}})
  const [expenses, setExpenses] = useState(expensesListModified);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [amountSort, setAmountSort] = useState('none');
  const [categorySort, setCategorySort] = useState('none');
  const [dateSort, setDateSort] = useState('none');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [overlay, setOverlay] = useState(false);
 
  useEffect(function(){
    setExpenses(filteredExpenses)
  },[filteredExpenses])

  useEffect(function(){
    showExpenseForm?document.body.style.overflow='hidden':document.body.style.overflow='auto'
  },[showExpenseForm])
  

  function handleAddExpense(expense){
    
    setExpenses(expenses=>[...expenses, expense]);
    setShowExpenseForm(false)
    setOverlay(false)
  }

  function handleSort(category, order){
    switch(category){
      case 'amount':
          sortByAmount(order);
          break;
      case 'category':
          sortByCategory(order);
          break;
      case 'date':
        sortByDate(order);
        break;
      default:
        filteredExpenses;
    }

  
}

function sortByAmount(order){
  if(order==='none'){
    setAmountSort('asc');
    setExpenses(filteredExpenses.slice().sort((a,b)=>a.amount-b.amount))
  }
  else if(order==='asc'){
    setAmountSort('desc')
    setExpenses(filteredExpenses.slice().sort((a,b)=>b.amount-a.amount))
  }
  else if(order==='desc'){
    setAmountSort('none')
    setExpenses(filteredExpenses)
}
}
function sortByCategory(order){
  if(order==='none'){
    setCategorySort('asc');
    setExpenses(expenses.slice().sort((a,b)=>a.category?.toLowerCase().localeCompare(b.category.toLowerCase())))
  }
  else if(order==='asc'){
    setCategorySort('desc')
    setExpenses(expenses.slice().sort((a,b)=>b.category.toLowerCase().localeCompare(a.category.toLowerCase())))
  }
  else if(order==='desc'){
    setCategorySort('none')
    setExpenses(filteredExpenses)
}
}
function sortByDate(order){
  if(order==='none'){
    setDateSort('asc');
    setExpenses(expenses.slice().sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime()))
  }
  else if(order==='asc'){
    setDateSort('desc')
    setExpenses(expenses.slice().sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()))
  }
  else if(order==='desc'){
    setDateSort('none')
    setExpenses(filteredExpenses)
}
}

  return (
    <div className={`${overlay?'app-disabled':'app'}`}>
    <h1>Expense Tracker</h1>
    {expenses.length===0 && !showExpenseForm && <p>Please add the expenses.</p>}
    {<Button onClick={()=>
      {setOverlay(true); setShowExpenseForm(true)}
      }>Add Expense</Button>}
      {showExpenseForm &&
      <AddExpenseForm onAddExpense={handleAddExpense} handleFormClose={()=>{setShowExpenseForm(false)}}/>
      }
    {expenses.length>0 && <div className='container'>
    
    <div className='expense-list'>
    <Filter setFilteredExpenses={setFilteredExpenses} expenseList={expensesListModified}/>
    <ExpenseList expenses={expenses} setExpenses={setExpenses} onSort={handleSort} amountSort={amountSort} categorySort={categorySort} dateSort={dateSort}/>
    </div>
    <ExpenseSummary expenses ={expenses}/>
    </div>
}
    </div>
  )
}

function Button({onClick,children}){
  return <button className='btn' onClick={onClick}>{children}</button>
}

function AddExpenseForm({onAddExpense, expense, handleFormClose}){

  const [amount, setAmount] = useState(expense?.amount?expense.amount:'');
  const [category2, setCategory2] = useState(expense?.category?expense.category:'');
  const [date, setDate] = useState(expense?.date?expense.date:'');
  const [description, setDescription] = useState(expense?.description?expense.description:'');
  const [categoryList, setCategoryList] = useState(categories);

  function handleSubmit(e){
    e.preventDefault();
   
    const newExpense= {
      id:expense?expense.id:crypto.randomUUID(),
      amount,
      category:category2,
      date,
      description
    }
  
    onAddExpense(newExpense)
  }

 return (
<Overlay onClick={handleFormClose}>
 <div className='add-expense' onClick={(e)=>e.stopPropagation()}>
  <div className='close-btn' onClick={handleFormClose}><span > &times;</span></div>
 <h2>Please add the expense</h2>
  <form className='add-expense-form' name={"add-expense-form"} onSubmit={handleSubmit} >
   <div className=' form-element'><label htmlFor="amount">Amount</label>
    <input type="number"  required value={amount} onChange={(e)=>setAmount(Number(e.target.value))}/></div>
   <div className=' form-element'><label htmlFor="category">Category</label>
    <select name="category" id="category" value={category2} onChange={(e)=>setCategory2(e.target.value)}>
      {categoryList.map((category)=>{
        return <option key={category.category_id} value={category.category}>{category.category}</option>
      })}
      {/* <option value="grocery">Grocery</option>
      <option value="medicines">Medicines</option>
      <option value="Snacks">Snacks</option> */}
    </select>
    </div>
   <div className=' form-element'><label htmlFor="date">Date</label>
    <input type="date"  required  value={date} onChange={(e)=>setDate(e.target.value)}/></div>
   <div className=' form-element'><label htmlFor="description">Description</label>
    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/></div>
   <div className='form-btn'> <Button>{expense?"Edit":"Add"}</Button></div>
  </form>
 </div>
 </Overlay>
 )
}

function ExpenseList({expenses, setExpenses, onSort, amountSort, categorySort, dateSort}){
  const [editExpenseForm, setEditExpenseForm] = useState(false);
  const [editExpense, setEditExpense] = useState({});

  useEffect(function(){
    editExpenseForm?document.body.style.overflow='hidden':document.body.style.overflow='auto'
  },[editExpenseForm])

 function onAddExpense(expense){
  setExpenses(expenses.map((data)=>data?.id==expense?.id? expense: data));
  setEditExpenseForm(false);
 }

function handleDelete(id){
  setExpenses(expenses.filter((expense)=>expense.id!==id))
}

  return (
    <>
 <table>
    <thead>
      <tr>
        <th onClick={()=>onSort('amount', amountSort)}>Amount 
          {amountSort==='none' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path  d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>}
          {amountSort==='asc'  && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>}
          {amountSort==='desc'  && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg>}
          </th>
        <th onClick={()=>onSort('category', categorySort)}>Category  
        {categorySort==='none' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path  d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>}
          {categorySort==='asc'  && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>}
          {categorySort==='desc'  && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg>}
        </th>
        <th onClick={()=>onSort('date', dateSort)}>Date  
        {dateSort==='none' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path  d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>}
          {dateSort==='asc'  && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>}
          {dateSort==='desc'  && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height={12} width={12}><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg>}

        </th>
        <th>Description</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
        {
          expenses.map((expense)=>(
      
            <tr key={expense.id}>
                    <td>{expense.amount} </td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>{expense.description}</td>
                    <td><button  onClick={()=>{setEditExpenseForm(prev=>!prev); setEditExpense(expense)}}>Edit</button><button onClick={()=>handleDelete(expense.id)}>Delete</button></td>
            </tr>))}
</tbody>   
  </table>
  {editExpenseForm && <AddExpenseForm onAddExpense={onAddExpense} expense={editExpense} handleFormClose={()=>setEditExpenseForm(false)}/>}
 </>
  )
  
}


function ExpenseSummary({expenses}){
 const totalSpending = expenses.reduce((acc, curr)=>acc+curr.amount,0);
 
 
  return (<div className='expense-summary'>
    <h1>Overview</h1>
    <TotalSpending totalSpending={totalSpending}/>
    <CategoryChart expenses={expenses}  />
    <MonthlyChart expenses={expenses}/>
    <CategoryWeekAmountChart expenses={expenses}/>
  </div>)
}

function TotalSpending({totalSpending}){
 
  return <><h2>Total Spending ${totalSpending}</h2></>
}

function CategoryChart({expenses}){

  const categorizedSum = expenses.reduce((acc, expense)=>{
    if(acc[expense.category]){
      acc[expense.category]+=expense.amount;
    }
    else{
      acc[expense.category] = expense.amount;
    }
    return acc;
  },{});
  
  const chartData = Object.entries(categorizedSum).map(([name, amount]) => ({
    name,
    y: amount
}));
  
  const options = {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Expense Categories'
    },
    series: [{
        name: 'Expenses',
        colorByPoint: true,
        data: chartData
    }],
    tooltip: {
        pointFormat: '<b>{point.name}</b>: {point.y} %'
    }
};
  return <>
  <h3>Expenses by Category (Bar Chart)</h3>
  <HighchartsReact 
  highcharts={Highcharts}
  options={options}
  />
  </>
}

function MonthlyChart({expenses}){
  
  const months = {January:0, February:0, March:0, April:0, May:0, June:0, July:0, August:0, September:0, October:0, November:0, December:0};

  const monthlyAmountSum = expenses.reduce((acc, expense)=>{
    const date = new Date(expense.date);
    const month = date.toLocaleDateString('default',{month:'long'});
    if(acc[month]){
      acc[month]+=expense.amount;
    }
    else{
      acc[month]=expense.amount;
    }
    return acc;
  },{});
   
  const allMonths = {...months, ...monthlyAmountSum}
  
  const options ={
    chart: {
      type: 'column' // Set the chart type to 'column'
    },
    title: {
      text: 'Expense Breakdown by Category'
    },
    xAxis: {
      categories: Object.keys(allMonths) // Set the categories (x-axis labels)
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: [
      {
        name: 'Amount',
        data: Object.values(allMonths) // Set the data (y-axis values)
      }
    ]
}
  return <><h3>Monthly Expenses (Bar Chart)</h3>
  <HighchartsReact 
  highcharts={Highcharts}
  options={options}
  />
  </>

}
function CategoryWeekAmountChart({expenses}){
 const weekDays = ["Sunday", "Monday", "TuesDay", "Wednesday", "Thrusday", "Friday"," Saturday"];
 const weeklyAmountSum = expenses.reduce((acc, expense)=>{
    const date = new Date(expense.date);
    const weekDay = date.getDay();
    
    const weekDayName = weekDays[weekDay]
    if(acc[weekDayName]){
      acc[weekDayName]+=expense.amount
    }
    else{
      acc[weekDayName] = expense.amount
    }
return acc;
 },{})
    const weekDayObjects ={"Sunday":0,"Monday":0, "Tuesday":0,"Wednesday":0, "Thrusday":0, "Friday":0,"Saturday":0 }
  
  const weekDaySum = {...weekDayObjects, ...weeklyAmountSum} 
  
  const options ={
    chart: {
      type: 'column' // Set the chart type to 'column'
    },
    title: {
      text: 'Expense Breakdown by weekday'
    },
    xAxis: {
      categories: Object.keys(weekDaySum) // Set the categories (x-axis labels)
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: [
      {
        name: 'Amount',
        data: Object.values(weekDaySum) // Set the data (y-axis values)
      }
    ]
}
 
  return <><h3>CategoryWeekAmountChart Expenses (Bubble Chart)

<HighchartsReact 
  highcharts={Highcharts}
  options={options}
  />
  </h3>
  
    
  </>

}

function Filter({setFilteredExpenses, expenseList}){
  const [showAmountFilter, setShowAmountFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [showAmountError, setShowAmountError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [amountApplyClicked, setAmountApplyClicked] = useState(false);
  const [categoryApplyClicked, setCategoryApplyClicked] = useState(false);
  const [dateApplyClicked, setDateApplyClicked] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateDifference, setDateDifference] = useState(-1);

  let categoriesList = [...new Set(expenseList.map((expense)=>expense.category))];
  function handleAmountChange(e){
    if(e.target.value==='custom'){
      if(!amountApplyClicked){
        setMinAmount('');
        setMaxAmount('');
      }
      setShowCustomAmount(true);
      return;
    }
    setShowCustomAmount(false);
    setMinAmount(Number(e.target.min))
    setMaxAmount(Number(e.target.max))
  }
  
  function handleAmountApply(){
    if(minAmount && maxAmount && minAmount>maxAmount){
      setShowAmountError(true);
      return;
    }
    setAmountApplyClicked(true);
    setFilteredExpenses(expenseList.filter((expense)=> expense.amount>=minAmount && expense.amount<=maxAmount))
    if(filteredCategory.length>0){
      setFilteredExpenses((expenses)=>expenses.filter((expense)=>filteredCategory.findIndex((category)=>expense.category.toLowerCase()===category.toLowerCase())>=0))
    }
    if(minDate!=='' && maxDate!==''){
      const minTimestamp = new Date(minDate);
      const maxTimestamp = new Date(maxDate);
      setFilteredExpenses((expenses)=>expenses.filter((expense)=>new Date(expense.date)>=minTimestamp && new Date(expense.date)<=maxTimestamp))
    }
  }

  function handleAmountClear(){
    setAmountApplyClicked(false);
    setShowCustomAmount(false); 
    setMinAmount(''); setMaxAmount('');
    setFilteredExpenses(expenseList.filter((expense)=>{
       const categoryCondition = filteredCategory.length>0 ? filteredCategory.findIndex((category)=>expense.category.toLowerCase()===category.toLowerCase())>=0: true
       const dateCondition = (minDate!=='' && maxDate!='') ? new Date(expense.date)>=new Date(minDate) && new Date(expense.date)<=new Date(maxDate):true
      return categoryCondition && dateCondition
    }))
  }

  function handleDateChange(e){
    if(e.target.value==='custom'){
      setMinDate('')
      setMaxDate('')
      setShowCustomDate(true);
      setDateDifference(-1);
      return;
    }
    setShowCustomDate(false);
    const [mindate,maxdate] = findDate(e.target.min,e.target.max)
    setMinDate(mindate)
   setMaxDate(maxdate)
  }

  function handleDateApply(){
    const minTimestamp = new Date(minDate);
    const maxTimestamp = new Date(maxDate);
    if(minDate && maxDate && minTimestamp>maxTimestamp){
      setShowDateError(true);
      return;
    }
    setDateApplyClicked(true)
    setFilteredExpenses(expenseList.filter((expense)=>new Date(expense.date)>=minTimestamp && new Date(expense.date)<=maxTimestamp))
    if(filteredCategory.length>0){
      setFilteredExpenses((expenses)=>expenses.filter((expense)=>filteredCategory.findIndex((category)=>expense.category.toLowerCase()===category.toLowerCase())>=0))
    }
    if(minAmount!=='' && maxAmount!==''){
      setFilteredExpenses((expenses)=>expenses.filter((expense)=>expense.amount>=minAmount && expense.amount<=maxAmount))
      setIsCalendarOpen(false);
    }
  }

  function handleDateClear(){
    setDateApplyClicked(false);
    setMinDate('');
    setMaxDate('');
    setShowCustomDate(false);
    setFilteredExpenses(expenseList.filter((expense)=>{
      const amountCondition = (minAmount!=='' && maxAmount!=='') ? expense.amount>=minAmount && expense.amount<=maxAmount:true
      const categoryCondition = filteredCategory.length>0 ? filteredCategory.findIndex((category)=>expense.category.toLowerCase()===category.toLowerCase())>=0: true
      return amountCondition && categoryCondition
    }))
    setDateDifference(-1);
  }

  function handleCategoryApply(){
    setCategoryApplyClicked(true)  
    setFilteredExpenses(expenseList.filter((expense)=>filteredCategory.findIndex((category)=>expense.category.toLowerCase()===category.toLowerCase())>=0))
    if(minAmount!=='' && maxAmount!==''){
      setFilteredExpenses((expenses)=>expenses.filter((expense)=>expense.amount>=minAmount && expense.amount<=maxAmount))
    }
    if(minDate!=='' && maxDate!==''){
      const minTimestamp = new Date(minDate);
      const maxTimestamp = new Date(maxDate);
      setFilteredExpenses((expenses)=>expenses.filter((expense)=>new Date(expense.date)>=minTimestamp && new Date(expense.date)<=maxTimestamp))
    }
  }

  function handleApply(){
    
    if(minAmount!='' && maxAmount!=''){
      if( minAmount>maxAmount){
        setShowAmountError(true);
        return;
      }
        setAmountApplyClicked(true);
        setFilteredExpenses(expenseList.filter((expense)=>expense.amount>=minAmount && expense.amount<=maxAmount))
      
    }
   
  
   if(minDate!='' && maxDate!=''){
    const minTimestamp = new Date(minDate);
    const maxTimestamp = new Date(maxDate);
    if( minTimestamp>maxTimestamp){
      setShowDateError(true);
      return;
    }
    setDateApplyClicked(true)
    setFilteredExpenses(expenseList.filter((expense)=>new Date(expense.date)>=minTimestamp && new Date(expense.date)<=maxTimestamp))
   }
   if(filteredCategory.length>0){
    setCategoryApplyClicked(true)    
    setFilteredExpenses(expenseList.filter((expense)=>filteredCategory.findIndex((category)=>expense.category.toLowerCase()===category.toLowerCase())>=0))
   }
   
  }

  function handleCategoryClear(){
    setCategoryApplyClicked(false)
    setFilteredCategory([])
    setFilteredExpenses(expenseList.filter((expense)=>{
      const amountCondition = (minAmount!=='' && maxAmount !=='') ? expense.amount>=minAmount && expense.amount<=maxAmount: true
      const dateCondition = (minDate!=='' && maxDate !=='')? new Date(expense.date)>=new Date(minDate) && new Date(expense.date)<=new Date(maxDate):true
      return amountCondition && dateCondition
    }))
  }

  function findDate(minDays, maxDays){
    let mindate = new Date();
    let maxdate = new Date();
    if(maxDays<=7){
      mindate.setDate(mindate.getDate()-maxDays)
      mindate = mindate.toISOString().split('T')[0]
      maxdate.setDate(maxdate.getDate()-minDays)
      maxdate = maxdate.toISOString().split('T')[0]
    }
    else if(maxDays<=31){
      mindate = new Date(Date.UTC(mindate.getFullYear(), mindate.getMonth(), 1)).toISOString().split('T')[0];
      maxdate = maxdate.toISOString().split('T')[0];
    }
   else if(maxDays<=62){
      mindate = new Date(Date.UTC(mindate.getFullYear(), mindate.getMonth()-1, 1)).toISOString().split('T')[0];
      let currentMonthFirstDate = new Date(Date.UTC(maxdate.getFullYear(), maxdate.getMonth(),1));
      maxdate = new Date(currentMonthFirstDate -1).toISOString().split('T')[0]
    }
    setDateDifference(maxDays);
    return [mindate, maxdate];
  }

  function handleCategoryChange(e){
    let isCategoryPresent = filteredCategory.findIndex((value)=>value===e.target.value) >=0
    if(isCategoryPresent){
      setFilteredCategory((category)=>category.filter((value)=>value!==e.target.value))
    }
    else{
      setFilteredCategory(()=>[...filteredCategory, e.target.value])
    }
  }

  function onDateMouseLeave(){
    if(!isCalendarOpen){
       setShowDateFilter(false)
      if(!dateApplyClicked){
        setMinDate(''); 
        setMaxDate(''); 
        setShowCustomDate(false);
        setDateDifference(-1)
      }
      }
  }



  return (
  <>
  <div className='filter'>
  <span>Filter: </span>
  <div className='filter-btn' onMouseOver={()=>{setShowCategoryFilter(false); setShowDateFilter(false); setShowAmountFilter(true)}} onMouseLeave={()=>{setShowAmountFilter(false); if(!amountApplyClicked) { setMinAmount(''); setMaxAmount(''); setShowCustomAmount(false)}}}>
  <button className={`${amountApplyClicked? ' btn btn-filter-selected':'btn'}`} >Amount</button>
  {showAmountFilter && <div className='amount'>
    <span>Please select amount in ($)</span>
    <fieldset >
    <div className='radio-amount'>
    <input type='radio' id='0-50' name='amount' value="0-50" checked={minAmount===0 && maxAmount === 50} min={0} max={50} onChange={handleAmountChange}/>
    <label htmlFor='0-50'>0-50</label>
    </div>
    <div className='radio-amount'>
    <input type='radio' id='50-100' name='amount' value="50-100"  checked={minAmount===50 && maxAmount === 100} min={50} max={100} onChange={handleAmountChange}/>
    <label htmlFor='50-100'>50-100</label>
    </div>
    <div className='radio-amount'>
    <input type='radio' id='100-150' name='amount' value="100-150" checked={minAmount===100 && maxAmount === 150} min={100} max={150} onChange={handleAmountChange}/>
    <label htmlFor='100-150'>100-150</label>
    </div>
    <div className='radio-amount'>
    <input type='radio' id='custom' name='amount' value='custom' checked={showCustomAmount} onChange={handleAmountChange}/>
    <label htmlFor='custom'>Custom</label>
   {showCustomAmount && <div className='custom-amount'>
      <label htmlFor="min-amount">Min amount</label>
      <input id="min-amount" type="number" value={minAmount} required onChange={(e)=>{setMinAmount(e.target.value?Number(e.target.value):''); setShowAmountError(false)}}/>
      <label htmlFor="max-amount">Max amount</label>
      <input id="max-amount" type="number" value={maxAmount} required onChange={(e)=>{setMaxAmount(e.target.value?Number(e.target.value):''); setShowAmountError(false)}}/>
      {showAmountError && <p className='error'>Max amount cannot be less than min amount.</p>}
    </div>}
    </div>
  </fieldset>
  <div className=' action-btn'>
  { <button className={`' btn ${minAmount==='' || maxAmount==='' && !amountApplyClicked? 'btn-disabled':'btn-clear'} `} disabled={minAmount==='' || maxAmount==='' && !amountApplyClicked} onClick={handleAmountClear}>Clear</button>}
  <button className={` btn ${minAmount==='' || maxAmount==='' ? 'btn-disabled': 'btn-apply'} `} disabled = {minAmount==='' || maxAmount===''}  onClick={handleAmountApply}>Apply</button>
  </div>
  </div>}
  </div>
  <div className='filter-btn' onMouseEnter={()=>{setShowAmountFilter(false); setShowDateFilter(false);setShowCategoryFilter(true)}} onMouseLeave={()=>{setShowCategoryFilter(false); if(!categoryApplyClicked){setFilteredCategory([])}}}>
  <button className={`${categoryApplyClicked? 'btn btn-filter-selected':'btn'}`}>Category</button>
   { showCategoryFilter && <div className='category'>
    <span>Please select category</span>
    <fieldset >
      {categoriesList.map((category2)=>{
        return <div className='checkbox' key={category2}>
        <input type='checkbox' id={category2} name='category' value={category2} checked={filteredCategory.findIndex((category1)=>category1.toLowerCase()===category2.toLowerCase())>=0} onChange={handleCategoryChange}/>
        <label htmlFor={category2}>{category2}</label>
        </div>
      }
      
      )}
    {/* 
    <div className='checkbox'>
    <input type='checkbox' id='groceries' name='category' value="groceries" checked={filteredCategory.findIndex((category)=>category.toLowerCase()==='groceries')>=0} onChange={handleCategoryChange}/>
    <label htmlFor='groceries'>Groceries</label>
    </div>
    <div className='checkbox'>
    <input type='checkbox' id='medicines' name='category' value="medicines" checked={filteredCategory.findIndex((category)=>category.toLowerCase()==='medicines')>=0} onChange={handleCategoryChange}/>
    <label htmlFor='medicines'>Medicines</label>
    </div>
    <div className='checkbox'>
    <input type='checkbox' id='snacks' name='category' value="snacks" checked={filteredCategory.findIndex((category)=>category.toLowerCase()==='snacks')>=0} onChange={handleCategoryChange}/>
    <label htmlFor='snacks'>Snacks</label>
    </div> */}
  </fieldset>
  <div className=' action-btn'>
  { <button className={`' btn ${filteredCategory.length==0 && !categoryApplyClicked? 'btn-disabled':'btn-clear'} `} disabled = {filteredCategory.length==0 && !categoryApplyClicked} onClick={handleCategoryClear}>Clear</button>}
  <button className={` btn ${ filteredCategory.length==0 ? 'btn-disabled': 'btn-apply'} `} disabled = {filteredCategory.length==0} onClick={handleCategoryApply}>Apply</button>
  </div>
  </div>}
  </div>
  <div className='filter-btn' onMouseEnter={()=>{setShowAmountFilter(false); setShowCategoryFilter(false);setShowDateFilter(true)}} onMouseLeave={onDateMouseLeave}>
  <button className={`${dateApplyClicked? 'btn btn-filter-selected':'btn'}`} >Date</button>
  {showDateFilter && <div className='date'>
    <span>Please select date</span>
    <fieldset >
    <div className='radio-date'>
    <input type='radio' id='today' name='date' min={0} max={0} checked={dateDifference==0} onChange={handleDateChange}/>
    <label htmlFor='today'>Today</label>
    </div>
    <div className='radio-date'>
    <input type='radio' id='last 7 days' name='date' min={0} max={7} checked={dateDifference==7} onChange={handleDateChange}/>
    <label htmlFor='last 7 days'>Last 7 days</label>
    </div>
    <div className='radio-date'>
    <input type='radio' id='This month' name='date' min={0} max={31} checked={dateDifference==31} onChange={handleDateChange}/>
    <label htmlFor='This month'>This month</label>
    </div>
    <div className='radio-date'>
    <input type='radio' id='Last month' name='date' min={0} max={62} checked={dateDifference==62} onChange={handleDateChange}/>
    <label htmlFor='Last month'>Last month</label>
    </div>
    <div className='radio-date'>
    <input type='radio' id='custom' name='date' value='custom' checked={showCustomDate} onChange={handleDateChange}/>
    <label htmlFor='custom'>Custom</label>
    {showCustomDate && <div className='custom-date'>
      <label htmlFor="min-date">Min date</label>
      <input id="min-date" type="date" value={minDate} onClick={()=>setIsCalendarOpen(true)} onChange={(e)=>{setMinDate(e.target.value); setShowDateError(false);
        //  setIsCalendarOpen(false)
         }}/>
      <label htmlFor="max-date">Max date</label>
      <input id="max-date" type="date" value={maxDate} onClick={()=>setIsCalendarOpen(true)} onChange={(e)=>{setMaxDate(e.target.value); setShowDateError(false);
      //  setIsCalendarOpen(false)

      }}/>
      {showDateError && <p className='error'>Max date cannot be less than min date.</p>}
    </div>}
    </div>
  </fieldset>
  <div className=' action-btn'>
  { <button className={`' btn ${minDate==='' || maxDate==='' && !dateApplyClicked? 'btn-disabled':'btn-clear'} `} disabled={minDate==='' || maxDate==='' && !dateApplyClicked} onClick={handleDateClear}>Clear</button>}
  <button className={`btn ${minDate==='' || maxDate===''? 'btn-disabled': 'btn-apply'}`} disabled={minDate==='' || maxDate===''} onClick={handleDateApply}>Apply</button>
  </div>
  </div>}
  </div>
  </div>
  </>
  )
}

function Overlay({children, onClick}){
    return (
      <div className='overlay' onClick={onClick}>
        {children}
      </div>
    )
}

export default App
