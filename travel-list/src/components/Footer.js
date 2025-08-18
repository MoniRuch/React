export default function Footer({ items }) {
    if(!items.length)
        return <p className="stats">
            <em>Start adding items for your trip 🚀</em>
        </p>

    const totalItems = items.length;
    const packedItems = items.filter(item => item.packed).length;
    const packedPercentage = Math.round(packedItems/totalItems * 100);

    return (
        <footer>
            <div className='stats'>
                {packedPercentage === 100 ? 'You are all set 💼' :
                    `You have total of ${totalItems} items, out of which ${packedItems} are packed (${packedPercentage}%) ✈️`}
            </div>
        </footer>)
}