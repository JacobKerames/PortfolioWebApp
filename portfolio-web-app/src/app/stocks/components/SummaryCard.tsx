interface SummaryCardProps {
    title: string;
    value: string;
    icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
    return (
        <div className="summary-card">
            <div className="card-title">
                <i className={`fas ${icon}`}></i>
                {title}
            </div>
            <div className="card-value">{value}</div>
        </div>
    );
};

export default SummaryCard;
