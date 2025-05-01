export interface StudentParent {
    student_id: number;
    parent_id: number;
    relationship: 'Father' | 'Mother' | 'Guardian' | 'Other';
    is_primary_contact: boolean;
    student_first_name?: string;
    student_last_name?: string;
    parent_first_name?: string;
    parent_last_name?: string;
}
