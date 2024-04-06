const rest_store = {
  '/api/employees': [
    { "id": 0, "name": "John Smith", "email":"john.smith@example.com", "phone":"555-0100", "department":2, "location": 2},
    { "id": 1, "name": "Jennifer Anderson", "email": "jennifer.anderson@example.com", "phone":"555-0201", "department":3, "location": 4},
    { "id": 2, "name": "Chris Moore", "email":"chris.moore@example.com","phone":"555-0107","department":6,"location":1 }
  ],
  '/api/departments':
    [
      {
        "department_id": 1,
        "name": "Finance"
      },
      {
        "department_id": 2,
        "name": "Marketing"
      },
      {
        "department_id": 3,
        "name": "Development"
      },
      {
        "department_id": 4,
        "name": "Human Resources"
      },
      {
        "department_id": 5,
        "name": "Sales"
      },
      {
        "department_id": 6,
        "name": "Legal"
      }
    ],
  '/api/locations':
    [
      {
        "location_id": 1,
        "name": "Boston, MA"
      },
      {
        "location_id": 2,
        "name": "New York, NY"
      },
      {
        "location_id": 3,
        "name": "Austin, TX"
      },
      {
        "location_id": 4,
        "name": "San Diego, CA"
      }
    ]
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  e.respondWith((async () => {
    try {
      if (url.pathname.startsWith('/api')) {
        const paths = url.pathname.split('/');
        const route = `/${paths[1]}/${paths[2]}`

        let items = rest_store[route];
        if (!items) {
          items = rest_store[route] = [];
        }
        switch (e.request.method) {
          case 'GET':
            return new Response(JSON.stringify(items));
            break;
          case 'POST': {
            const newId = items.reduce((max, item) => Math.max(max, item.id), 0)
            const { value: bodyIntArray } = await e.request.body.getReader().read()
            const json = new TextDecoder().decode(bodyIntArray)
            const obj = JSON.parse(json)
            obj.id = newId + 1;
            items.push(obj);
            return new Response(JSON.stringify(obj))
          }
          case 'PUT': {
            const { value: bodyIntArray } = await e.request.body.getReader().read()
            const json = new TextDecoder().decode(bodyIntArray)
            const obj = JSON.parse(json)
            const id = parseInt(obj.id);
            let index = -1;
            for (let i = 0; i < items.length; i++) {
              if (id == items[i].id)
                index = i;
            }
            if (index >= 0) {
              items[index] = obj;
              return new Response(JSON.stringify(items[index]))
            }
            return new Response('Error', { "status": "404" });
          }
          case 'DELETE': {
            const path = url.pathname.split('/')
            const id = parseInt(path.slice(-1));
            let index = -1;
            for (let i = 0; i < items.length; i++) {
              if (id == items[i].id)
                index = i;
            }
            if (index >= 0) {
              items.splice(index, 1);
              return new Response('Element deleted', { "status": "200" })
            }
            return new Response('Error', { "status": "404" });
          }
        }
      }
      else
        return await fetch(e.request);
    }
    catch (error) {
      console.error(error)
    }
  })());
});
