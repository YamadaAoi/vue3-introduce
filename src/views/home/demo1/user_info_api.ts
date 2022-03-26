import axios from 'axios'

export async function getDataById(id: string) {
  return await axios.get(`/${id}.json`)
}
