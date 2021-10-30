const tasks = [
    {
        level: "1",
        type: "age",
        text: "If you were born in 2000, how old are you?",
        result: "21",
        image: "",
        units: "years",
        info: "enter your age",
    },
    {
        level: "1",
        type: "age",
        text: "If you were born in 2005, how old are you?",
        result: "16",
        image: "",
        units: "years",
        info: "enter your age",
    },
    {
        level: "1",
        type: "age",
        text: "If you were born in 1990, how old are you?",
        result: "31",
        image: "",
        units: "years",
        info: "enter your age",
    },
    {
        level: "2",
        type:"time",
        text: "What time will the train arrive at the terminal if it leaves at 2:00 and spend 4 h 22 min on the way?",
        result: "6:22",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lMd0YjmiIv-2kMTkAf0kyCdyV-keH09APw&usqp=CAU",
        units: "hours: minutes",
        info: "put use a colon in the answer",
    },
    {
        level: "2",
        type: "time",
        text: "What time will the train arrive at the terminal if it leaves at 1:00 and spend 5 h 30 min on the way?",
        result: "6:30",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lMd0YjmiIv-2kMTkAf0kyCdyV-keH09APw&usqp=CAU",
        units: "hours: minutes",
        info: "put use a colon in the answer",
    },
    {
        level: "2",
        type: "time",
        text: "What time will the train arrive at the terminal if it leaves at 3:00 and spend 2 h 44 min on the way?",
        result: "5:44",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lMd0YjmiIv-2kMTkAf0kyCdyV-keH09APw&usqp=CAU",
        units: "hours: minutes",
        info: "put use a colon in the answer",
    },
    {
        level: "3",
        type: "o'clock",
        text: "The sun rises at 7:37 and the sun sets at 22:27. What is the length of the day?",
        result: "15h un 10 min.",
        image: "https://user-images.githubusercontent.com/91952766/139082923-c3a2e5af-38f2-4c73-b192-d646483eaec2.png",
        units: "hours and minutes",
        info: "",
    },
    {
        level: "3",
        type: "o'clock",
        text: "The sun rises at 3:25 and the sun sets at 23:40. What is the length of the day?",
        result: "19h un 45 min.",
        image: "https://user-images.githubusercontent.com/91952766/139082923-c3a2e5af-38f2-4c73-b192-d646483eaec2.png",
        units: "hours and minutes",
        info: "",
    },
    {
        level: "3",
        type: "o'clock",
        text: "The sun rises at 6:05 and the sun sets at 18:27. What is the length of the day?",
        result: "11h un 38 min.",
        image: "https://user-images.githubusercontent.com/91952766/139082923-c3a2e5af-38f2-4c73-b192-d646483eaec2.png",
        units: "hours and minutes",
        info: "",
    },
    {
        level: "4",
        type: "years",
        text: "Determine which are the long years: 2044.g., 2088.g., 2045.g., 2061.g., 2046?",
        result: "-2044.g. un 2088.g.",
        image: "https://st4.depositphotos.com/4248271/41453/i/600/depositphotos_414532206-stock-photo-2043-2044-new-year-2043.jpg",
        units: "years",
        info: "can be determined if the last two digits divide by 4",
    },
    {
        level: "4",
        type: "years",
        text: "Determine which are the long years: 1920.g., 1988.g., 1945.g., 1961.g., 1846?",
        result: "-1988.g. un 1920.g.",
        image: "https://st4.depositphotos.com/4248271/41453/i/600/depositphotos_414532206-stock-photo-2043-2044-new-year-2043.jpg",
        units: "years",
        info: "can be determined if the last two digits divide by 4",
    },
    {
        level: "4",
        type: "years",
        text: "Determine which are the long years: 2044.g., 2088.g., 2045.g., 2061.g., 2046?",
        result: "-2044.g. un 2088.g.",
        image: "https://st4.depositphotos.com/4248271/41453/i/600/depositphotos_414532206-stock-photo-2043-2044-new-year-2043.jpg",
        units: "years",
        info: "can be determined if the last two digits divide by 4",
    },
    {
        level: "5",
        type: "seconds",
        text:"The two girls spent 96 minutes together in the store. Calculations of how much time the other girls spent in the store. Jumchan was in the store for 46 min, but the other girl:",
        result: "52",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjba-Rwqxy4l59VuN4Gaownj_0yOqqW_JeiGu4U60LXyB32vhmePJs6AziQJV-l4uNlc&usqp=CAU",
        units: "minutes",
        info: "you should subtract",
    },
    {
        level: "5",
        type: "seconds",
        text:"The two girls spent 100 minutes together in the store. Calculations of how much time the other girls spent in the store. Jumchan was in the store for 46 min, but the other girl:",
        result: "54",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjba-Rwqxy4l59VuN4Gaownj_0yOqqW_JeiGu4U60LXyB32vhmePJs6AziQJV-l4uNlc&usqp=CAU",
        units: "minutes",
        info: "you should subtract",
    },
    {
        level: "5",
        type: "seconds",
        text:"The two girls spent 150 minutes together in the store. Calculations of how much time the other girls spent in the store. Jumchan was in the store for 66 min, but the other girl:",
        result: "84",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjba-Rwqxy4l59VuN4Gaownj_0yOqqW_JeiGu4U60LXyB32vhmePJs6AziQJV-l4uNlc&usqp=CAU",
        units: "minutes",
        info: "you should subtract",
    },
    {
        level: "6",
        type: "months",
        text: "How Many Months are in 10 Years in 11 Months?",
        result: "131 month",
        image: "https://user-images.githubusercontent.com/91952766/139088301-fda81c7e-4103-43c1-8b8a-e61a27cf91aa.png",
        units: "months",
        info: "Converts to the correct time units.",
    },
    {
        level: "6",
        type: "months",
        text: "How Many Months are in 5 Years in 10 Months?",
        result: "70 month",
        image: "https://user-images.githubusercontent.com/91952766/139088301-fda81c7e-4103-43c1-8b8a-e61a27cf91aa.png",
        units: "months",
        info: "Converts to the correct time units.",
    },
    {
        level: "6",
        type: "months",
        text: "How Many Months are in 17 Years in 7 Months?",
        result: "211 month",
        image: "https://user-images.githubusercontent.com/91952766/139088301-fda81c7e-4103-43c1-8b8a-e61a27cf91aa.png",
        units: "months",
        info: "Converts to the correct time units.",
    },
    {
        level: "7",
        text: "How many days have 9 weeks and 21 days.",
        result: "84 days",
        image: "https://user-images.githubusercontent.com/91952766/139089485-4bbc60c7-04de-4ea3-9b7c-22c2d3bd2986.png",
        type: "convert",
        units: "days",
        info: "Converts to the correct time units.",
    },
    {
        level: "7",
        text: "How many days have 5 weeks and 20 days.",
        result: "55 days",
        image: "https://user-images.githubusercontent.com/91952766/139089485-4bbc60c7-04de-4ea3-9b7c-22c2d3bd2986.png",
        type: "convert",
        units: "days",
        info: "Converts to the correct time units.",
    },
    {
        level: "7",
        text: "How many days have 11 weeks and 13 days.",
        result: "90 days",
        image: "https://user-images.githubusercontent.com/91952766/139089485-4bbc60c7-04de-4ea3-9b7c-22c2d3bd2986.png",
        type: "convert",
        units: "days",
        info: "Converts to the correct time units.",
    },
    {
        level: "8",
        type: "seconds",
        text: "How many s are 5min. 75s?",
        result: "375 min",
        image: "https://user-images.githubusercontent.com/91952766/139090611-61dabd3a-d5da-4762-9119-a33fc375b24b.png",
        units: "seconds",
        info: "Converts to the correct time units.",
    },
    {
        level: "8",
        type: "seconds",
        text: "How many s are 10min. 40s.?",
        result: "640 min",
        image: "https://user-images.githubusercontent.com/91952766/139090611-61dabd3a-d5da-4762-9119-a33fc375b24b.png",
        units: "seconds",
        info: "Converts to the correct time units.",
    },
    {
        level: "8",
        type: "seconds",
        text: "How many s are 13min. 80s.?",
        result: "860 min",
        image: "https://user-images.githubusercontent.com/91952766/139090611-61dabd3a-d5da-4762-9119-a33fc375b24b.png",
        units: "seconds",
        info: "Converts to the correct time units.",
    },
    {
        level: "9",
        type: "age",
        text: "The clock shows exactly 3 pm.",
        result: "XV or III",
        image: "https://user-images.githubusercontent.com/91952766/139093547-cccbade1-35d1-4a95-bb6a-670ef4f587bc.png",
        units: "Romen numerals",
        info:"write with I and X and V only",
    },
    {
        level: "9",
        type: "age",
        text: "The clock shows exactly 4 pm.",
        result: "XVI",
        image: "https://user-images.githubusercontent.com/91952766/139093547-cccbade1-35d1-4a95-bb6a-670ef4f587bc.png",
        units: "Romen numerals",
        info:"write with I and x and v only",
    },
    {
        level: "9",
        type: "age",
        text: "The clock shows exactly 6 pm.",
        result: "XVIII",
        image: "https://user-images.githubusercontent.com/91952766/139093547-cccbade1-35d1-4a95-bb6a-670ef4f587bc.png",
        units: "Romen numerals",
        info:"write with l and x and v only",
    },
    {
        level: "10",
        type: "kilometers apart",
        text: "Two skaters go from the skate park in opposite directions at the same time at speeds of 9 km / h and 6 km / h respectively. How far apart will they be in 4 hours?",
        result: "60km",
        image: "https://user-images.githubusercontent.com/91952766/139092810-049ef90c-6435-4208-b57b-cdd1aaff04ec.png", 
        units: "kilometers",
        info: "You nead to calculate",
    },
    {
        level: "10",
        type: "kilometers apart",
        text: "Two skaters go from the skate park in opposite directions at the same time at speeds of 9 km / h and 6 km / h respectively. How far apart will they be in 4 hours?",
        result: "60km",
        image: "https://user-images.githubusercontent.com/91952766/139092810-049ef90c-6435-4208-b57b-cdd1aaff04ec.png",
        units: "kilometers",
        info: "You nead to calculate",
    },
    {
        level: "10",
        type: "kilometers apart",
        text: "Two skaters go from the skate park in opposite directions at the same time at speeds of 9 km / h and 6 km / h respectively. How far apart will they be in 4 hours?",
        result: "60km",
        image: "https://user-images.githubusercontent.com/91952766/139092810-049ef90c-6435-4208-b57b-cdd1aaff04ec.png",
        units: "kilometers",
        info: "You nead to calculate",
    },
    {
        level: "11",
        type: "how long",
        text: "Currently, the cyclist rides at a speed of 22 km / h. How long would a cyclist get at this speed in 7 hours?",
        result: "154",
        image: "https://user-images.githubusercontent.com/91952766/139095488-91ae4363-e01c-4950-9cb0-dcb9a935ceb9.png",
        units: "kilometers",
        info: "calculate",
    },
    {
        level: "11",
        type: "how long",
        text: "Currently, the cyclist rides at a speed of 15 km / h. How long would a cyclist get at this speed in 5 hours?",
        result: "75",
        image: "https://user-images.githubusercontent.com/91952766/139095488-91ae4363-e01c-4950-9cb0-dcb9a935ceb9.png",
        units: "kilometers",
        info: "calculate",
    },
    {
        level: "11",
        type: "how long",
        text: "Currently, the cyclist rides at a speed of 30 km / h. How long would a cyclist get at this speed in 3 hours?",
        result: "90",
        image: "https://user-images.githubusercontent.com/91952766/139095488-91ae4363-e01c-4950-9cb0-dcb9a935ceb9.png",
        units: "kilometers",
        info: "calculate",
    },
    {
        level: "12",
        type: "car",
        text: "The car drives at a speed of 20 km / h near the school. How long would the car cover 140 km?",
        result: "7",
        image: "https://user-images.githubusercontent.com/91952766/139099688-83b2ef9d-1ce2-47c5-b96e-7100ba604bd2.png",
        units: "hours",
        info: "It takes X hours to cover 140 km.",
    },
    {
        level: "12",
        type: "car",
        text: "The car drives at a speed of 40 km / h near the school. How long would the car cover 80 km?",
        result: "2",
        image: "https://user-images.githubusercontent.com/91952766/139099688-83b2ef9d-1ce2-47c5-b96e-7100ba604bd2.png",
        units: "hours",
        info: "It takes X hours to cover 140 km.",
    },
    {
        level: "12",
        type: "car",
        text: "The car drives at a speed of 30 km / h near the school. How long would the car cover 180 km?",
        result: "6",
        image: "https://user-images.githubusercontent.com/91952766/139099688-83b2ef9d-1ce2-47c5-b96e-7100ba604bd2.png",
        units: "hours",
        info: "It takes X hours to cover 140 km.",
    },
    {
        level: "13",
        type: "kilometers",
        text: "How many kilometers can a car travel in 12 minutes at 90 km / h?",
        result: "18",
        image: "https://user-images.githubusercontent.com/91952766/139099711-77147463-703f-4bb0-9a96-0fb10002e7d8.png",
        units: "km",
        info: "calculate",
    },
    {
        level: "13",
        type: "kilometers",
        text: "How many kilometers can a car travel in 20 minutes at 50 km / h?",
        result: "16.5",
        image: "https://user-images.githubusercontent.com/91952766/139099711-77147463-703f-4bb0-9a96-0fb10002e7d8.png",
        units: "km",
        info: "calculate",
    },
    {
        level: "13",
        type: "kilometers",
        text: "How many kilometers can a car travel in 33 minutes at 70 km / h?",
        result: "38.5",
        image: "https://user-images.githubusercontent.com/91952766/139099711-77147463-703f-4bb0-9a96-0fb10002e7d8.png",
        units: "km",
        info: "calculate",
    },
    {    
        level: "14",
        type: "m/min",
        text: "Express the given unit -7m / min per m / h.",
        result: "420",
        image: "https://user-images.githubusercontent.com/91952766/139099746-9b9e24b8-a9ed-45c2-b790-fbfa7c15ce46.png",
        units: "meters in hour",
        info: "convert",
    },
    {    
        level: "14",
        type: "m/min",
        text: "Express the given unit -9m / min per m / h.",
        result: "540",
        image: "https://user-images.githubusercontent.com/91952766/139099746-9b9e24b8-a9ed-45c2-b790-fbfa7c15ce46.png",
        units: "meters in hour",
        info: "convert",
    },
    {    
        level: "14",
        type: "m/min",
        text: "Express the given unit -5m / min per m / h.",
        result: "300",
        image: "https://user-images.githubusercontent.com/91952766/139099746-9b9e24b8-a9ed-45c2-b790-fbfa7c15ce46.png",
        units: "meters in hour",
        info: "convert",
    },
    {
        level: "15",
        type: "m/h",
        text: "At what speed do you have to drive to drive 90m in 9 minutes?",
        result: "60",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "meters in hour",
        info: "convert",
    },
    {
        level: "15",
        type: "m/h",
        text: "At what speed do you have to drive to drive 50m in 12 minutes?",
        result: "250.2",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "meters in hour",
        info: "4.17 m/min",
    },
    {
        level: "15",
        type: "m/h",
        text: "At what speed do you have to drive to drive 70m in 16 minutes?",
        result: "262.2",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "meters in hour",
        info: "4.38 m/min",
    },
    /*tālāk ir viduskolas līmenis*/
    {
        level: "16",
        type: "accelerated",
        text: "In steadily accelerated motion, the final speed of the body is 11 m / s, but the average speed is 8 m / s.What was the speed of body movement in the beginning? ",
        result: "5",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: "(v0 + v)/2",
    },
    {
        level: "16",
        type: "accelerated",
        text: "In steadily accelerated motion, the final speed of the body is 13 m / s, but the average speed is 10 m / s.What was the speed of body movement in the beginning? ",
        result: "7",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: "(v0 + v)/2",
    },
    {
        level: "16",
        type: "accelerated",
        text: "In steadily accelerated motion, the final speed of the body is 7 m / s, but the average speed is 6 m / s.What was the speed of body movement in the beginning? ",
        result: "5",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: "(v0 + v)/2",
    },
    {
        level: "17",
        type: "uniformly slow motion",
        text: "In uniformly slow motion, the initial speed of the body is 24 m / s, but the average speed is 16 m / s. What was the final speed of the body movement?",
        result: "8",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: "(v0 + v)/2",
    },
    {
        level: "17",
        type: "uniformly slow motion",
        text: "In uniformly slow motion, the initial speed of the body is 33 m / s, but the average speed is 20 m / s. What was the final speed of the body movement?",
        result: "7",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: "(v0 + v)/2",
    },
    {
        level: "17",
        type: "uniformly slow motion",
        text: "In uniformly slow motion, the initial speed of the body is 10 m / s, but the average speed is 15 m / s. What was the final speed of the body movement?",
        result: "20",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: "(v0 + v)/2",
    },
    {
        level: "18",
        type: "t in s",
        text: "Calculate the time during which the body, moving at an acceleration of 1 m / s2, travels a distance of 26 m, if at the beginning of the movement its speed was 12 m / s!",
        result: "2",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "t",
        info: ";)",
    },
    {
        level: "18",
        type: "t in s",
        text: "Calculate the time during which the body, moving at an acceleration of 0,2 m/s2, travels a distance of 280,if at the beginning of the movement its speed was 12 m/s!",
        result: "20",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "t",
        info: ":)",
    },
    {
        level: "18",
        type: "t in s",
        text: "Calculate the time during which the body, moving at an acceleration of 0,5 m/s2, travels a distance of 204 m, if at the beginning of the movement its speed was 14 m/s!",
        result: "12",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "t",
        info: ":)",
    },
    {
        level: "19",
        type: "x",
        text: "Using the body motion coordinate equation x = −14−13t, calculate the body coordinates after 18 seconds.",
        result: "-248",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "no decimal places",
    },
    {
        level: "19",
        type: "x",
        text: "Using the body movement coordinate equation x = −15−19t, calculate the body coordinates after 5 seconds.",
        result: "-110",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m",
        info: "no decimal places",
    },
    {
        level: "19",
        type: "x",
        text: "Izmantojot ķermeņa kustības koordinātes vienādojumu x=−7−14t, aprēķini ķermeņa koordināti pēc 7 sekundēm.",
        result: "-105",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "no decimal places",
    },
    {
        level: "20",
        type: "Δt",
        text: "Smooth rectilinear motion follows the equation of motion x = −300 + 10t. Calculations, in what time interval will the body reach the starting point of the coordinate axis (x = 0)?",
        result: "30",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "x=x0+vxt",
    },
    {
        level: "20",
        type: "Δt",
        text: "Vienmērīga taisnlīnijas kustība notiek pēc kustības koordinātes vienādojuma x=500−10t. Aprēķini, kādā laika intervālā ķermenis sasniegs koordinātu ass sākumpunktu (x=0)?",
        result: "30",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "x=x0+vxt",
    },
    {
        level: "20",
        type: "Δt",
        text: "Vienmērīga taisnlīnijas kustība notiek pēc kustības koordinātes vienādojuma x=500−10t. Aprēķini, kādā laika intervālā ķermenis sasniegs koordinātu ass sākumpunktu (x=0)?",
        result: "50",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: ":)",
    },
    {
        level: "21",
        type: "average speed",
        text: "The cyclist did the first 100 m for 10 s, but the next 200 m for 22 seconds. Calculate the average speed of the athlete during the whole movement!",
        result: "9,4",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: ":)",
    },
    {
        level: "21",
        type: "average speed",
        text: "The cyclist made the first 120 m in 14 s, but the next 200 m - in 25 seconds. Calculate the average speed of the athlete during the whole movement!",
        result: "8,2",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: ":)",
    },
    {
        level: "21",
        type: "average speed",
        text: "The cyclist did the first 100 m in 15 s, but the next 220 m in 24 seconds. Calculate the average speed of the athlete during the whole movement!",
        result: "8,2",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "m/s",
        info: ":)",
    },
    {
        level: "22",
        type: "average car speed",
        text: "The car covered 6 km at an average speed of 65 km / h and the remaining 10 km at 100 km / h. Calculate the average speed of the car over the entire road section!",
        result: "83",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "v average = lk / Δtk",
    },
    {
        level: "22",
        type: "average car speed",
        text: "TThe car covered 4 km at an average speed of 75 km / h and the remaining 9 km at 110 km / h. Calculate the average speed of the car over the entire road section!",
        result: "96",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "v average = lk / Δtk",
    },
    {
        level: "22",
        type: "average car speed",
        text: "The car covered a distance of 7 km at an average speed of 70 km / h and the remaining 10 km at 90 km / h. Calculate the average speed of the car over the entire road section!",
        result: "81",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "v average = lk / Δtk",
    },
    {
        level: "23",
        type: "average train speed",
        text: "The train traveled the first third of the road at 4 times the speed of the rest. Calculations of the speed in the first third when the average speed was 33 km / h.",
        result: "99",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "v average = lk / Δtk",
    },
    {
        level: "23",
        type: "average train speed",
        text: "The train traveled the first third of the road at 2 times the speed of the rest. Calculations of the speed at the first third when the average speed was 35 km / h.",
        result: "58",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "v average = lk / Δtk",
    },
    {
        level: "23",
        type: "average train speed",
        text: "The train traveled the first third of the road at 3 times the speed of the rest. Calculations of the speed at the first third when the average speed was 29 km / h.",
        result: "68",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "km/h",
        info: "v average = lk / Δtk",
    },
    {
        level: "24",
        type: "distance between",
        text: "A cyclist and a motorcyclist ride on a straight road. The speed of a cyclist is 21.6 km / h, of a motorcyclist - 75.6 km / h. After how long will the distance between them be 648 m (before the meeting), if at the beginning the distance between them was 1620 m?",
        result: "36",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "Δt = (l-lΔ)/(v1 + v2)",
    },
    {
        level: "24",
        type: "distance between",
        text: "A cyclist and a motorcyclist ride on a straight road. The speed of a cyclist is 21.6 km / h, of a motorcyclist - 86.4 km / h. After how long will the distance between them be 750 m (before the meeting), if at the beginning the distance between them was 1560 m?",
        result: "27",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "Δt = (l-lΔ)/(v1 + v2)",
    },
    {
        level: "24",
        type: "distance between",
        text: "A cyclist and a motorcyclist ride on a straight road. The speed of a cyclist is 14.4 km / h, of a motorcyclist - 86.4 km / h. After how long will the distance between them be 644 m (before the meeting), if at the beginning the distance between them was 1736 m?",
        result: "39",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "Δt = (l-lΔ)/(v1 + v2)",
    },
    {
        level: "25",
        type: "time neaded",
        text: "The bird flies at an acceleration of 0.5 m / s. It decided to jump from a tree branch to the roof of a house 45 m away. Calculate the time it took for a bird to get from a tree branch to the roof of a house, assuming that it made a straight motion!",
        result: "13,4",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "Answers are rounded to one decimal place!",
    },
    {
        level: "25",
        type: "time neaded",
        text: "The bird flies at an acceleration of 0.8 m / s. It decided to jump from a tree branch to the roof of a house 50 m away.  Calculate the time, assume it made a straight line motion!",
        result: "11,2",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "Answers are rounded to one decimal place!",
    },
    {
        level: "25",
        type: "time neaded",
        text: "The bird flies at an acceleration of 0.7 m / s. It decided to jump from a tree branch to the roof of a house 70 m away.   Calculate the time it took for a bird to get from a tree branch to the roof of a house, assuming that it made a straight motion!",
        result: "14,1",
        image: "https://user-images.githubusercontent.com/91952766/139099785-86629b89-cfa2-4f47-aeb6-87c154695e16.png",
        units: "s",
        info: "Answers are rounded to one decimal place!",
    },
];

export default tasks;