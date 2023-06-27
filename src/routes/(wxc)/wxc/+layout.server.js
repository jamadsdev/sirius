/** @type {import('./$types').LayoutServerLoad} */
export async function load({ parent, locals }) {
  // let orgName = '';
  await parent();

  const fetchOrgs = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${locals.user.access}`);

    let url = "https://webexapis.com/v1/organizations";
    const response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    if (response.status == "200") {
      const { items } = await response.json();
      if (items.length === 1) {
        return items[0].displayName;
      }
    }
  };

  return {
    user: locals.user,
    orgs: fetchOrgs(),
  };
}
