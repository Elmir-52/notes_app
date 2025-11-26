export async function getDb<T>(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': 'FoWJEFZpChL1qmK9PSu3iMumFUU3nIra7asXD3lU',
        'X-Parse-REST-API-Key': '7uChYhtECTvdi5uY7VlUtwIENOX44lz0kWvwn3yF',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const cleanItems = data.results.map((el: T) => {
    
    // @ts-expect-error: Игнорируем ошибку так как тут ошибка из-за any и не использования
    let { createdAt, updatedAt, ...cleanItem} = el;
    return cleanItem;
    })
    console.log('Данные:', cleanItems);
    return cleanItems;

  } catch (error) {
    alert(`Произошла ошибка :(`);
    console.error('Ошибка:', error);
  }
}

export async function postDb<T>(url: string, body: T) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'FoWJEFZpChL1qmK9PSu3iMumFUU3nIra7asXD3lU',
                'X-Parse-REST-API-Key': '7uChYhtECTvdi5uY7VlUtwIENOX44lz0kWvwn3yF',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        const data: T = await response.json();
        console.log(data);
        return data;
    } catch(e) {
        alert(`Произошла ошибка :(`);
        console.error(e);
    }
}

export async function patchDb<T>(url: string, body: T) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-Parse-Application-Id': 'FoWJEFZpChL1qmK9PSu3iMumFUU3nIra7asXD3lU',
                'X-Parse-REST-API-Key': '7uChYhtECTvdi5uY7VlUtwIENOX44lz0kWvwn3yF',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        const data: T = await response.json();
        return data;
    } catch(e) {
        alert(`Произошла ошибка :(`);
        console.error(e);
    }
}

export async function deleteDb<T>(url: string) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-Parse-Application-Id': 'FoWJEFZpChL1qmK9PSu3iMumFUU3nIra7asXD3lU',
                'X-Parse-REST-API-Key': '7uChYhtECTvdi5uY7VlUtwIENOX44lz0kWvwn3yF',
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        
        const data: T = await response.json();
        return data;
    } catch(e) {
        alert(`Произошла ошибка :(`);
        console.error(e);
    }
}