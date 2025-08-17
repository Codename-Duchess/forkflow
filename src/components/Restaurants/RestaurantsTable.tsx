interface RestaurantsTableProps {
    restaurants: Restaurant[]
}

interface Restaurant {
    id: number;
    owner_id: number;
    name: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    county: string | null;
    postcode: string;
    created_at: string;
    updated_at: string;
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