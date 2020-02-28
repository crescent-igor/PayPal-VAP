const fetch = require('node-fetch');

const inputUrl = 'https://api.github.com/orgs/paypal';

const normalizedUrl = url => url.replace('https://api.github.com', 'http://localhost:8081');

const myFetch = url => fetch(normalizedUrl(url)).then(res => res.json());

const getDatasFromUrls = urls => Promise.all([
    ...urls.map(it => myFetch(it))
]);

const getDataFromUrl = url => myFetch(url);



/*
 * Promise Chaining  
*/
// let result = null;

// getDataFromUrl(inputUrl)    // fetch org data
//     .then(org => {              
//         result = org;
//         return org['repos_url'];
//     })
//     .then(repos => getDataFromUrl(repos)) // fetch reposData
//     .then(data => {
//         result.reposData = data;
//         return data;
//     })
//     .then(reposData => reposData.map(repo => repo.issues_url.split('{')[0]))
//     .then(data => {
//         result.my_repos_data = {};
//         data.forEach((val, idx) => {
//             result.my_repos_data[val] = idx;
//         })
//         return data;
//     })
//     .then(issues => getDatasFromUrls(issues))
//     .then(issuesData => {
//         Object.keys(result.my_repos_data).forEach(val => {
//             const idx = result.my_repos_data[val];
//             result.my_repos_data[val] = issuesData[idx];
//         })
//     })
//     .then(() => {
//         console.log(result);
//     });



//     /*
//     *  Promise Hell
//     */

   getDataFromUrl(inputUrl)
   .then(org => {
       const reposUrl = org['repos_url'];
       return getDataFromUrl(reposUrl)
       .then(data => {
           org.reposData = data;
           return org;
       })
       .then(reposData => reposData.map(repo => repo.issues_url.split('{')[0]))
       .then(data => {
            org.my_repos_data = {};
            data.forEach((val, idx) => {
                org.my_repos_data[val] = idx;
            })
            return data;
        })
        .then(issues => getDatasFromUrls(issues))
        .then(issuesData => {
            Object.keys(org.my_repos_data).forEach(val => {
                const idx = org.my_repos_data[val];
                org.my_repos_data[val] = issuesData[idx];
            })
            return org;
        })
   })
   .then(result => {
       console.log(result);
   });

    /*
    *  Async Way
    */
    const asyncWay = async () => {
        const org = await getDataFromUrl(inputUrl);
        const reposData = await getDataFromUrl(org['repos_url']) || [];
        org.reposData = reposData;
        let issues_url = reposData.map(issue_url => issue_url.issues_url.split('{')[0]);

        org.my_repos_data = {};
        issues_url.forEach((val, idx) => {
            org.my_repos_data[val] = idx;
        });

        const issuesData = await getDatasFromUrls(issues_url);
        Object.keys(org.my_repos_data).forEach(val => {
            const idx = org.my_repos_data[val];
            org.my_repos_data[val] = issuesData[idx];
        });

        console.log(org);
    };

    // asyncWay();