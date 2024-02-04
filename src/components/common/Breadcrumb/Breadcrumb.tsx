import React from 'react';
import Link from '@/components/ui/link/Link/Link.tsx';
import css from './Breadcrumb.module.scss';


export type BreadcrumbItem = {
    label: React.ReactNode | string;
    url: string;
}

export type BreadcrumbProps = {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
    const { items } = props;

    return (
        <ol className={ css.container }>
            {
                items.map((item) =>
                    (
                        <li className={ css.item } key={ item.url }>
                            <Link className={ css.link } to={ item.url }>
                                { item.label }
                            </Link>
                        </li>
                    ),
                )
            }
        </ol>
    );
};

export default React.memo(Breadcrumb);