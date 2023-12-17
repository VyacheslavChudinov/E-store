namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 100;

        private int _pageSize = MaxPageSize;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }

        public int PageNumber { get; set; } = 1;
    }
}