const fs = require('fs');

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randF(min, max, dec=2) { return parseFloat((Math.random()*(max-min)+min).toFixed(dec)); }
function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function gauss(mean, std) {
  let u=0, v=0;
  while(u===0) u=Math.random();
  while(v===0) v=Math.random();
  return mean + std * Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*v);
}

const cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Pune','Kolkata','Ahmedabad','Jaipur','Lucknow','Surat','Chandigarh','Bhopal','Indore','Coimbatore'];
const genders = ['Male','Female','Other'];
const educations = ['High School','Bachelor','Master','PhD','Diploma'];
const occupations = ['Engineer','Doctor','Teacher','Business Owner','Student','Manager','Designer','Analyst','Salesperson','Freelancer','Government Employee','Retired'];
const channels = ['Mobile App','Website','In-Store','Social Media','Email Campaign','Word of Mouth'];
const paymentMethods = ['Credit Card','Debit Card','UPI','Net Banking','Cash','EMI'];
const topCategories = ['Electronics','Fashion','Grocery','Home Decor','Sports','Books','Beauty','Travel','Food Delivery','Health'];

// 4 distinct customer archetypes for realistic clustering
function generateCustomer(id) {
  const archetype = rand(1,4);
  let age, income, spend, frequency, recency, satisfaction, onlineRatio, discountSensitivity, loyaltyScore, sessions, cartAbandonment;

  if(archetype === 1) {
    // PREMIUM — High income, high spend, low frequency, low discount sensitivity
    age = rand(30, 55);
    income = rand(120000, 500000);
    spend = rand(15000, 80000);
    frequency = rand(2, 8);
    recency = rand(1, 30);
    satisfaction = randF(4.0, 5.0, 1);
    onlineRatio = randF(0.5, 0.9);
    discountSensitivity = randF(0.1, 0.3);
    loyaltyScore = rand(700, 1000);
    sessions = rand(5, 20);
    cartAbandonment = randF(0.05, 0.2);
  } else if(archetype === 2) {
    // BUDGET — Lower income, low spend, high discount sensitivity
    age = rand(18, 35);
    income = rand(15000, 45000);
    spend = rand(500, 5000);
    frequency = rand(1, 5);
    recency = rand(20, 120);
    satisfaction = randF(2.5, 3.8, 1);
    onlineRatio = randF(0.6, 1.0);
    discountSensitivity = randF(0.7, 1.0);
    loyaltyScore = rand(100, 400);
    sessions = rand(8, 30);
    cartAbandonment = randF(0.4, 0.8);
  } else if(archetype === 3) {
    // LOYAL — Mid income, consistent spend, very high frequency
    age = rand(25, 50);
    income = rand(50000, 120000);
    spend = rand(5000, 20000);
    frequency = rand(15, 40);
    recency = rand(1, 10);
    satisfaction = randF(3.8, 5.0, 1);
    onlineRatio = randF(0.3, 0.7);
    discountSensitivity = randF(0.3, 0.6);
    loyaltyScore = rand(600, 950);
    sessions = rand(20, 60);
    cartAbandonment = randF(0.1, 0.35);
  } else {
    // AT-RISK — Once-active, now declining: long recency, dropping frequency
    age = rand(28, 60);
    income = rand(35000, 100000);
    spend = rand(2000, 12000);
    frequency = rand(1, 4);
    recency = rand(60, 365);
    satisfaction = randF(1.5, 3.2, 1);
    onlineRatio = randF(0.2, 0.6);
    discountSensitivity = randF(0.4, 0.8);
    loyaltyScore = rand(200, 600);
    sessions = rand(1, 10);
    cartAbandonment = randF(0.3, 0.7);
  }

  const joinDate = new Date(2020+rand(0,3), rand(0,11), rand(1,28));
  const fav1 = pick(topCategories);
  let fav2 = pick(topCategories); while(fav2===fav1) fav2=pick(topCategories);

  return {
    'Customer ID': `CUST-${String(id).padStart(5,'0')}`,
    'Age': Math.max(18, Math.min(75, Math.round(gauss(age, 5)))),
    'Gender': pick(genders),
    'City': pick(cities),
    'Education': pick(educations),
    'Occupation': pick(occupations),
    'Annual Income (₹)': Math.max(10000, Math.round(gauss(income, income*0.2))),
    'Join Date': joinDate.toISOString().split('T')[0],
    'Total Spend (₹)': Math.max(100, Math.round(gauss(spend, spend*0.3))),
    'Purchase Frequency': Math.max(1, Math.round(gauss(frequency, 3))),
    'Recency (days)': Math.max(1, Math.round(gauss(recency, recency*0.3))),
    'Avg Order Value (₹)': Math.round(spend / Math.max(1,frequency)),
    'Satisfaction Score': Math.max(1, Math.min(5, +satisfaction)),
    'Online Purchase Ratio': Math.max(0, Math.min(1, +onlineRatio.toFixed(2))),
    'Discount Sensitivity': Math.max(0, Math.min(1, +discountSensitivity.toFixed(2))),
    'Loyalty Score': Math.max(0, Math.min(1000, loyaltyScore)),
    'Sessions per Month': Math.max(1, Math.round(gauss(sessions, 5))),
    'Cart Abandonment Rate': Math.max(0, Math.min(1, +cartAbandonment.toFixed(2))),
    'Preferred Channel': pick(channels),
    'Payment Method': pick(paymentMethods),
    'Top Category 1': fav1,
    'Top Category 2': fav2,
    'Returns Count': rand(0, archetype===1?2:5),
    'Referrals Made': rand(0, archetype===3?8:3),
    'Archetype': ['Premium','Budget','Loyal','At-Risk'][archetype-1]
  };
}

const rows = [];
for(let i=1;i<=1100;i++) rows.push(generateCustomer(i));

const headers = Object.keys(rows[0]);
const csv = [headers.join(','), ...rows.map(r=>headers.map(h=>JSON.stringify(r[h]??'')).join(','))].join('\n');
fs.writeFileSync('/home/claude/customer-segmentation/data/customers.csv', csv);
console.log('Generated', rows.length, 'customers');
console.log('Columns:', headers.length);
