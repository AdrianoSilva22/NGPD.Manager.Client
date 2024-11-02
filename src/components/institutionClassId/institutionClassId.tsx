// Componente Pai (por exemplo, em uma página)
import { useSetAtom } from 'jotai';
import { institutionClassIdAtom } from '@/atoms/atoms';
import { useEffect } from 'react';
import AvailabilityPagination from '@/app/(logged)/empresa/disponibilidade/page';

const ParentComponent = () => {
    const setInstitutionClassId = useSetAtom(institutionClassIdAtom);

    useEffect(() => {
        const institutionClassId = 'some-id-from-context-or-props';
        setInstitutionClassId(institutionClassId);
    }, [setInstitutionClassId]);

    return <AvailabilityPagination />;
};

export default ParentComponent;
