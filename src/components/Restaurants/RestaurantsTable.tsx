import { Restaurant } from "@/types/restaurant";

interface RestaurantsTableProps {
    restaurants: Restaurant[]
}

const RestaurantsTable = ({ restaurants }: RestaurantsTableProps) => {

    return (
        <div className="mt-4">
            <table>
                <thead>
                    <tr>
                        <th>Restaurant name</th>
                        <th>Address</th>
                        <th>Controls</th>
                    </tr>
                </thead>

                {restaurants && restaurants.length > 0 ? (
                    <tbody>{restaurants.map((restaurant) => (
                        <tr key={restaurant.id} className="mb-2">
                            <td className="text-lg font-semibold">{restaurant.name}</td>
                            <td>{restaurant.address_line1}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}</tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>
                                No restaurants found.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default RestaurantsTable;