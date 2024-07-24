const apiToken = 'f60ab7dc88323f2e28b17d155af3e3bd7dec0081';
const companyDomain = 'khz';



async function getUserId() {
  try {
      const response = await fetch(`https://${companyDomain}.pipedrive.com/api/v1/users?api_token=${apiToken}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      const data = await response.json();
      return data.data[0].id;
  } catch (error) {
      console.error('Error fetching users:', error);
      return [];
  }
}


async function createDeal() {
  const userId = await getUserId();

  if (!userId) {
      console.error('User not found');
      return;
  }

  const dealData = {
      title: "MakCat's deal",
      user_id: userId
  };

  try {
      const response = await fetch(`https://${companyDomain}.pipedrive.com/api/v1/deals?api_token=${apiToken}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dealData)
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
          console.log('Deal created successfully!');
      } else {
          console.log('Error creating deal.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

createDeal();
